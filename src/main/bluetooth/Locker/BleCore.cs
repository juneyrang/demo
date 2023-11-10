class BleCore
{
	private bool asyncLock = false;

	/// <summary>
	/// current connection service
	/// </summary>
	public GattDeviceService CurrentService { get; private set; }

	/// <summary>
	/// Currently connected Bluetooth device
	/// </summary>
	public BluetoothLEDevice CurrentDevice { get; private set; }

	/// <summary>
	/// write characteristics
	/// </summary>
	public GattCharacteristic CurrentWriteCharacteristic { get; private set; }

	/// <summary>
	/// Notify the feature object
	/// </summary>
	public GattCharacteristic CurrentNotifyCharacteristic { get; private set; }

	/// <summary>
	/// Store detected devices
	/// </summary>
	public List<BluetoothLEDevice> DeviceList { get; private set; }

	/// <summary>
	/// Feature Notification Type Notification Enable
	/// </summary>
	private const GattClientCharacteristicConfigurationDescriptorValue CHARACTERISTIC_NOTIFICATION_TYPE = GattClientCharacteristicConfigurationDescriptorValue.Notify;

	/// <summary>
	/// Define Search Bluetooth Device
	/// </summary>
	public delegate void DeviceWatcherChangedEvent(BluetoothLEDevice bluetoothLEDevice);

	/// <summary>
	/// Search Bluetooth events
	/// </summary>
	public event DeviceWatcherChangedEvent DeviceWatcherChanged;

	/// <summary>
	/// Get service commission
	/// </summary>
	public delegate void CharacteristicFinishEvent(int size);

	/// <summary>
	/// Get service events
	/// </summary>
	public event CharacteristicFinishEvent CharacteristicFinish;

	/// <summary>
	/// Get a characteristic commission
	/// </summary>
	public delegate void CharacteristicAddedEvent(GattCharacteristic gattCharacteristic);

	/// <summary>
	/// Get a feature event
	/// </summary>
	public event CharacteristicAddedEvent CharacteristicAdded;

	/// <summary>
	/// accept data commission
	/// </summary>
	/// <param name="sender"></param>
	/// <param name="data"></param>
	public delegate void RecDataEvent(GattCharacteristic sender, byte[] data);

	/// <summary>
	/// Accept data event
	/// </summary>
	public event RecDataEvent Recdate;

	/// <summary>
	/// Currently connected Bluetooth Mac
	/// </summary>
	private string CurrentDeviceMAC { get; set; }

	private BluetoothLEAdvertisementWatcher Watcher = null;

	public BleCore()
	{
		DeviceList = new List<BluetoothLEDevice>();
	}

	/// <summary>
	/// Search Bluetooth devices
	/// </summary>
	public void StartBleDeviceWatcher()
	{
		Watcher = new BluetoothLEAdvertisementWatcher();

		Watcher.ScanningMode = BluetoothLEScanningMode.Active;

		// only activate the watcher when we're recieving values >= -80
		Watcher.SignalStrengthFilter.InRangeThresholdInDBm = -80;

		// stop watching if the value drops below -90 (user walked away)
		Watcher.SignalStrengthFilter.OutOfRangeThresholdInDBm = -90;

		// register callback for when we see an advertisements
		Watcher.Received += OnAdvertisementReceived;

		// wait 5 seconds to make sure the device is really out of range
		Watcher.SignalStrengthFilter.OutOfRangeTimeout = TimeSpan.FromMilliseconds(5000);
		Watcher.SignalStrengthFilter.SamplingInterval = TimeSpan.FromMilliseconds(2000);

		// starting watching for advertisements
		Watcher.Start();

		Console.writeline ("Automatically discovers the device ..");
	}

	/// <summary>
	/// Stop Search Bluetooth
	/// </summary>
	public void StopBleDeviceWatcher()
	{
		if (Watcher != null)
			this.Watcher.Stop();
	}

	/// <summary>
	//A active disconnection connection
	/// </summary>
	/// <returns></returns>
	public void Dispose()
	{
		CurrentDeviceMAC = null;
		CurrentService?.Dispose();
		CurrentDevice?.Dispose();
		CurrentDevice = null;
		CurrentService = null;
		CurrentWriteCharacteristic = null;
		CurrentNotifyCharacteristic = null;
		Console.WriteLine ("Practice Disconnect");
	}

	/// <summary>
	/// match
	/// </summary>
	/// <param name="Device"></param>
	public void StartMatching(BluetoothLEDevice Device)
	{
		this.CurrentDevice = Device;
	}

	/// <summary>
	/// Send a data interface
	/// </summary>
	/// <returns></returns>
	public void Write(byte[] data)
	{
		if (CurrentWriteCharacteristic != null)
		{
			CurrentWriteCharacteristic.WriteValueAsync(CryptographicBuffer.CreateFromByteArray(data), GattWriteOption.WriteWithResponse).Completed = (asyncInfo, asyncStatus) =>
			{
				if (asyncStatus == AsyncStatus.Completed)
				{
					GattCommunicationStatus a = asyncInfo.GetResults();
					Console.writeline ("Send Data:" + Bitconverter.tostring (data) + "State:" + a);
				}
			};
		}

	}

	/// Get Bluetooth services
	/// </summary>
	public void FindService()
	{
		this.CurrentDevice.GetGattServicesAsync().Completed = (asyncInfo, asyncStatus) =>
	   {
		   if (asyncStatus == AsyncStatus.Completed)
		   {
			   var services = asyncInfo.GetResults().Services;
			   Console.WriteLine("GattServices size=" + services.Count);
			   foreach (GattDeviceService ser in services)
			   {
				   FindCharacteristic(ser);
			   }
			   CharacteristicFinish?.Invoke(services.Count);
		   }
	   };

	}

	/// <summary>
	// / Press MAC address directly to assemble the device ID lookup device
	/// </summary>
	public void SelectDeviceFromIdAsync(string MAC)
	{
		CurrentDeviceMAC = MAC;
		CurrentDevice = null;
		BluetoothAdapter.GetDefaultAsync().Completed = (asyncInfo, asyncStatus) =>
		{
			if (asyncStatus == AsyncStatus.Completed)
			{
				BluetoothAdapter mBluetoothAdapter = asyncInfo.GetResults();
				Byte [] _Bytes1 = bitconverter.getbytes (mBluetoothAdapter.BluetoothAddress); // Ulong converted to byte array
				Array.Reverse(_Bytes1);
				string macAddress = BitConverter.ToString(_Bytes1, 2, 6).Replace('-', ':').ToLower();
				string Id = "BluetoothLE#BluetoothLE" + macAddress + "-" + MAC;
				Matching(Id);
			}
		};
	}

	/// <summary>
	/// Get action
	/// </summary>
	/// <returns></returns>
	public void SetOpteron(GattCharacteristic gattCharacteristic)
	{
		byte[] _Bytes1 = BitConverter.GetBytes(this.CurrentDevice.BluetoothAddress);
		Array.Reverse(_Bytes1);
		this.CurrentDeviceMAC = BitConverter.ToString(_Bytes1, 2, 6).Replace('-', ':').ToLower();

		String msg = "Positive connection device <" + this.currentDeviceMac + ">.";
		Console.WriteLine(msg);

		if (gattCharacteristic.CharacteristicProperties == GattCharacteristicProperties.Write)
		{
			this.CurrentWriteCharacteristic = gattCharacteristic;
		}
		if (gattCharacteristic.CharacteristicProperties == GattCharacteristicProperties.Notify)
		{
			this.CurrentNotifyCharacteristic = gattCharacteristic;
		}
		if ((uint)gattCharacteristic.CharacteristicProperties == 26)
		{

		}

		if (gattCharacteristic.CharacteristicProperties == (GattCharacteristicProperties.Write | GattCharacteristicProperties.Notify))
		{
			this.CurrentWriteCharacteristic = gattCharacteristic;
			this.CurrentNotifyCharacteristic = gattCharacteristic;
			this.CurrentNotifyCharacteristic.ProtectionLevel = GattProtectionLevel.Plain;
			this.CurrentNotifyCharacteristic.ValueChanged += Characteristic_ValueChanged;
			this.CurrentDevice.ConnectionStatusChanged += this.CurrentDevice_ConnectionStatusChanged;
			this.EnableNotifications(CurrentNotifyCharacteristic);
		}

	}

	private void OnAdvertisementReceived(BluetoothLEAdvertisementWatcher watcher, BluetoothLEAdvertisementReceivedEventArgs eventArgs)
	{
		BluetoothLEDevice.FromBluetoothAddressAsync(eventArgs.BluetoothAddress).Completed = (asyncInfo, asyncStatus) =>
		{
			if (asyncStatus == AsyncStatus.Completed)
			{
				if (asyncInfo.GetResults() == null)
				{
					//Console.WriteLine ("No results obtained");
				}
				else
				{
					BluetoothLEDevice currentDevice = asyncInfo.GetResults();

					if (DeviceList.FindIndex((x) => { return x.Name.Equals(currentDevice.Name); }) < 0)
					{
						this.DeviceList.Add(currentDevice);
						DeviceWatcherChanged?.Invoke(currentDevice);
					}

				}

			}
		};
	}

	/// <summary>
	/// Get characteristics
	/// </summary>
	private void FindCharacteristic(GattDeviceService gattDeviceService)
	{
		this.CurrentService = gattDeviceService;
		this.CurrentService.GetCharacteristicsAsync().Completed = (asyncInfo, asyncStatus) =>
		{
			if (asyncStatus == AsyncStatus.Completed)
			{
				var services = asyncInfo.GetResults().Characteristics;
				foreach (var c in services)
				{
					this.CharacteristicAdded?.Invoke(c);
				}

			}
		};
	}

	/// <summary>
	/// Searching Bluetooth device
	/// </summary>
	/// <returns></returns>
	private void Matching(string Id)
	{
		try
		{
			BluetoothLEDevice.FromIdAsync(Id).Completed = (asyncInfo, asyncStatus) =>
		   {
			   if (asyncStatus == AsyncStatus.Completed)
			   {
				   BluetoothLEDevice bleDevice = asyncInfo.GetResults();
				   this.DeviceList.Add(bleDevice);
				   Console.WriteLine(bleDevice);
			   }

			   if (asyncStatus == AsyncStatus.Started)
			   {
				   Console.WriteLine(asyncStatus.ToString());
			   }
			   if (asyncStatus == AsyncStatus.Canceled)
			   {
				   Console.WriteLine(asyncStatus.ToString());
			   }
			   if (asyncStatus == AsyncStatus.Error)
			   {
				   Console.WriteLine(asyncStatus.ToString());
			   }
		   };
		}
		catch (Exception e)
		{
			String msg = "No equipment" + E.toTOString ();
			Console.WriteLine(msg);
			this.StartBleDeviceWatcher();
		}
	}


	private void CurrentDevice_ConnectionStatusChanged(BluetoothLEDevice sender, object args)
	{
		if (sender.ConnectionStatus == BluetoothConnectionStatus.Disconnected && CurrentDeviceMAC != null)
		{
			if (!asyncLock)
			{
				asyncLock = true;
				Console.WriteLine ("Device has been disconnected");
				//this.CurrentDevice?.Dispose();
				//this.CurrentDevice = null;
				//CurrentService = null;
				//CurrentWriteCharacteristic = null;
				//CurrentNotifyCharacteristic = null;
				//SelectDeviceFromIdAsync(CurrentDeviceMAC);
			}
		}
		else
		{
			if (!asyncLock)
			{
				asyncLock = true;
				Console.WriteLine ("Device is connected");
			}
		}
	}

	/// <summary>
	/// Set the feature object to receive notification objects
	/// </summary>
	/// <param name="characteristic"></param>
	/// <returns></returns>
	private void EnableNotifications(GattCharacteristic characteristic)
	{
		Console.writeline ("Receive Notification Object =" + CurrentDevice.Name + ":" + CurrentDevice.connectionStatus);
		characteristic.WriteClientCharacteristicConfigurationDescriptorAsync(CHARACTERISTIC_NOTIFICATION_TYPE).Completed = (asyncInfo, asyncStatus) =>
		{
			if (asyncStatus == AsyncStatus.Completed)
			{
				GattCommunicationStatus status = asyncInfo.GetResults();
				if (status == GattCommunicationStatus.Unreachable)
				{
					Console.writeline ("Unavailable");
					if (CurrentNotifyCharacteristic != null && !asyncLock)
					{
						this.EnableNotifications(CurrentNotifyCharacteristic);
					}
					return;
				}
				asyncLock = false;
				Console.writeLine ("Device Connection Status" + Status;
			}
		};
	}

	/// <summary>
	/// Accept Bluetooth data
	/// </summary>
	private void Characteristic_ValueChanged(GattCharacteristic sender, GattValueChangedEventArgs args)
	{
		byte[] data;
		CryptographicBuffer.CopyToByteArray(args.CharacteristicValue, out data);
		Recdate?.Invoke(sender, data);
	}

}

class Progame
{
	private static BleCore bleCore = null;

	private static List<GattCharacteristic> characteristics = new List<GattCharacteristic>();

	public static void Main(string[] args)
	{
		bleCore = new BleCore();
		bleCore.DeviceWatcherChanged += DeviceWatcherChanged;
		bleCore.CharacteristicAdded += CharacteristicAdded;
		bleCore.CharacteristicFinish += CharacteristicFinish;
		bleCore.Recdate += Recdata;
		bleCore.StartBleDeviceWatcher();

		Console.ReadKey(true);

		bleCore.Dispose();
		bleCore = null;
	}

	private static void CharacteristicFinish(int size)
	{
		if (size <= 0)
		{
			Console.writeline ("device is not connected");
			return;
		}
	}

	private static void Recdata(GattCharacteristic sender, byte[] data)
	{
		string str = BitConverter.ToString(data);
		Console.WriteLine(sender.Uuid + "             " + str);
	}

	private static void CharacteristicAdded(GattCharacteristic gatt)
	{
		Console.WriteLine(
			"handle:[0x{0}]  char properties:[{1}]  UUID:[{2}]",
			gatt.AttributeHandle.ToString("X4"),
			gatt.CharacteristicProperties.ToString(),
			gatt.Uuid);
		characteristics.Add(gatt);
	}

	private static void DeviceWatcherChanged(BluetoothLEDevice currentDevice)
	{
		byte[] _Bytes1 = BitConverter.GetBytes(currentDevice.BluetoothAddress);
		Array.Reverse(_Bytes1);
		string address = BitConverter.ToString(_Bytes1, 2, 6).Replace('-', ':').ToLower();
		Console.writeline ("Discovery Device: <" + CurrentDevice.Name +> Address: <"+ Address +">);

		// Specify an object and use the following method to connect the device
		//ConnectDevice(currentDevice);
	}

	private static void ConnectDevice(BluetoothLEDevice Device)
	{
		characteristics.Clear();
		bleCore.StopBleDeviceWatcher();
		bleCore.StartMatching(Device);
		bleCore.FindService();
	}
}