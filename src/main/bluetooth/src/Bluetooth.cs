using InTheHand.Net.Bluetooth;
using InTheHand.Net.Sockets;
using System;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Windows.Forms;

namespace Can
{
    public partial class Bluetooth : Form
    {
        BluetoothListener _Listener;
        private BluetoothClient _ConnectedClient;
        private bool _Go;
        private Thread _ListenForConnection;
        private Thread _ListenToConnected;

        public Bluetooth()
        {
            InitializeComponent();
            _Go = true;
            comboBoxDevices.Enabled = false;
            buttonConnect.Enabled = false;
            textBoxReceived.Enabled = false;
            textBoxInput.Enabled = false;
            BluetoothClient c = new BluetoothClient();

            foreach (BluetoothDeviceInfo di in c.PairedDevices)
            {
                comboBoxDevices.Items.Add(di.DeviceName ?? di.DeviceAddress.ToString());
            }
            comboBoxDevices.Enabled = true;
            buttonConnect.Enabled = comboBoxDevices.Items.Count > 0;

            _Listener = new BluetoothListener(BluetoothService.SerialPort);
            _Listener.Start();
            _ListenForConnection = new Thread(new ThreadStart(ListenForConnection));
            _ListenForConnection.Start();
        }

        private void AppendText(string text)
        {
            BeginInvoke((MethodInvoker)delegate
            {
                textBoxReceived.AppendText(text + Environment.NewLine);
            });
        }

        /// <summary>
        /// Server mode: listen for devices that want to connect.
        /// </summary>
        private void ListenForConnection()
        {
            while (_Go)
            {
                if (_Listener.Pending())
                {
                    if (_ConnectedClient != null)
                    {
                        BluetoothClient c = _Listener.AcceptBluetoothClient();
                        c.GetStream().Write(ASCIIEncoding.ASCII.GetBytes("Go away."), 0, 8);
                        c.Close();
                        c.Dispose();
                        AppendText($"Refused connection from {c.RemoteMachineName} because already connected to {_ConnectedClient.RemoteMachineName}.");
                        continue;
                    }

                    _ConnectedClient = _Listener.AcceptBluetoothClient();
                    BluetoothDeviceInfo di = _ConnectedClient.PairedDevices.FirstOrDefault(z => z.DeviceName == _ConnectedClient.RemoteMachineName);

                    if(di == null)
                    {
                        AppendText($"Refused connection from unpaired device {_ConnectedClient.RemoteMachineName}.");
                        _ConnectedClient.Dispose();
                        _ConnectedClient = null;
                        continue;
                    }

                    AppendText("Connection incoming from " + di.DeviceName + "...");

                    _ListenToConnected = new Thread(new ThreadStart(ListenToConnected));
                    _ListenToConnected.Start();

                    AppendText("Connected.");
                    BeginInvoke((MethodInvoker)delegate
                    {
                        textBoxReceived.Enabled = true;
                        textBoxInput.Enabled = true;
                    });
                }
            }
        }

        /// <summary>
        /// Client mode: conect to a paired device.
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void buttonConnect_Click(object sender, EventArgs e)
        {
            if(_ConnectedClient != null)
            {
                _ConnectedClient.GetStream().Write(ASCIIEncoding.ASCII.GetBytes("Go away."), 0, 8);
                _ConnectedClient.Close();
                _ConnectedClient.Dispose();
                _ConnectedClient = null;
            }

            _ConnectedClient = new BluetoothClient();
            BluetoothDeviceInfo di = _ConnectedClient.PairedDevices.FirstOrDefault(z => z.DeviceName == comboBoxDevices.SelectedItem.ToString());
            if (di == null)
            {
                AppendText($"No such device: {comboBoxDevices.SelectedItem.ToString()}.");
                return;
            }

            di.SetServiceState(BluetoothService.SerialPort, true);
            _ConnectedClient.Connect(di.DeviceAddress, BluetoothService.SerialPort);
            if (!di.Connected)
            {
                AppendText("Connecting failed.");
            }
            AppendText($"Connected to {di.DeviceName} @ {di.DeviceAddress}.");
            textBoxReceived.Enabled = true;
            textBoxInput.Enabled = true;

            Thread t = new Thread(new ThreadStart(ListenToConnected));
            t.Start();
        }

        private void ListenToConnected()
        {
            Stream s = _ConnectedClient.GetStream();
            while (_Go)
            {
                if (!_ConnectedClient.Connected) { break; }

                if (s.CanRead && s.Length > 0)
                {
                    int a = int.Parse(s.Length.ToString());
                    byte[] buffer = new byte[a];
                    s.Read(buffer, 0, a);
                    string msg = System.Text.ASCIIEncoding.ASCII.GetString(buffer);
                    AppendText("> " + msg);
                }
            }
            _ConnectedClient.Close();
            _ConnectedClient.Dispose();
        }

        private void textBoxInput_KeyPress(object sender, KeyPressEventArgs e)
        {
            if (e.KeyChar == (char)Keys.Return)
            {
                string msg = textBoxInput.Text.Trim() + Environment.NewLine;
                byte[] buffer = ASCIIEncoding.ASCII.GetBytes(msg);
                try
                {
                    _ConnectedClient.GetStream().Write(buffer, 0, buffer.Length);
                    textBoxInput.Text = string.Empty;
                    textBoxReceived.AppendText("< " + msg);
                }
                catch (Exception ex)
                {
                    AppendText(ex.Message);
                }
            }
        }

        private void Bluetooth_FormClosing(object sender, FormClosingEventArgs e)
        {
            textBoxInput.Enabled = false;
            textBoxReceived.Enabled = false;
            _Go = false;
            _ListenForConnection.Join();
            _ListenToConnected.Join();
        }
    }
}