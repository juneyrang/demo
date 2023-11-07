
namespace Locker.Bluetooth.Core
{
    public class LockerDeviceWatcher
    {
        // Additional properties we would like about the device.
        // Property strings are documented here https://msdn.microsoft.com/en-us/library/windows/desktop/ff521659(v=vs.85).aspx
        string[] requestedProperties =
            {
                "System.Devices.Aep.CanPair",
                "System.Devices.Aep.DeviceAddress",
                "System.Devices.Aep.IsConnected",
                "System.Devices.Aep.IsPresent",
                "System.Devices.Aep.IsPaired"
            };

        private DeviceWatcher _deviceWatcher;
        private List<string> _filters;

        public event EventHandler<DeviceLockerEventArgs> DeviceChanged;
        protected virtual void OnDeviceChanged(DeviceLockerEventArgs e)
        {
            DeviceChanged?.Invoke(this, e);
        }

        private void Watcher_Stopped(DeviceWatcher watcher, object obj)
        {
            OnDeviceChanged(obj);
        }

        private void Watcher_EnumerationCompleted(DeviceWatcher sender, object obj)
        {
            // Protect against race condition if the task runs after the app stopped the deviceWatcher.
            if (sender == _deviceWatcher)
                OnDeviceChanged(obj);
        }

        private async void Watcher_Added(DeviceWatcher sender, DeviceInformation deviceInformation)
        {
            if (await IsDeviceCompatible(deviceInformation.Id))
            {
                // Protect against race condition if the task runs after the app stopped the deviceWatcher.
                if (sender == _deviceWatcher)
                {
                    var args = new DeviceLockerEventArgs()
                    {
                        Device = new LockerDeviceInfo()
                        {
                            Id = deviceInformation.Id,
                            IsDefault = deviceInformation.IsDefault,
                            IsEnabled = deviceInformation.IsEnabled,
                            Name = deviceInformation.Name,
                            IsPaired = deviceInformation.Pairing.IsPaired,
                            Kind = deviceInformation.Kind.ToString(),
                            Properties = deviceInformation.Properties.ToDictionary(pair => pair.Key, pair => pair.Value)
                        }
                    };

                    OnDeviceChanged(args);
                }
            }
        }

        private async void Watcher_Updated(DeviceWatcher sender, DeviceInformationUpdate deviceInformationUpdate)
        {
            if (await IsDeviceCompatible(deviceInformationUpdate.Id))
            {
                // Protect against race condition if the task runs after the app stopped the deviceWatcher.
                if (sender == _deviceWatcher)
                {
                    var args = new DeviceLockerEventArgs()
                    {
                        Device = new LockerDeviceInfo()
                        {
                            Id = deviceInformationUpdate.Id,
                            Kind = deviceInformationUpdate.Kind.ToString(),
                            Properties = deviceInformationUpdate.Properties.ToDictionary(pair => pair.Key, pair => pair.Value)
                        }
                    };

                    OnDeviceUpdated(args);
                }
            }
        }

        private async void Watcher_Removed(DeviceWatcher sender, DeviceInformationUpdate deviceInformationUpdate)
        {
            if (await IsDeviceCompatible(deviceInformationUpdate.Id))
            {
                // Protect against race condition if the task runs after the app stopped the deviceWatcher.
                if (sender == _deviceWatcher)
                {
                    var args = new DeviceLockerEventArgs()
                    {
                        Device = new LockerDeviceInfo()
                        {
                            Id = deviceInformationUpdate.Id,
                            Kind = deviceInformationUpdate.Kind.ToString(),
                            Properties = deviceInformationUpdate.Properties.ToDictionary(pair => pair.Key, pair => pair.Value)
                        }
                    };

                    OnDeviceRemoved(args);
                }
            }
        }

        private async Task<bool> IsDeviceCompatible(string deviceId)
        {
            var compatibleDevice = true;
            try
            {
                //if filters were passed, check if the device name contains one of the names in the list
                if (_filters != null)
                {
                    using (var device = await BluetoothLEDevice.FromIdAsync(deviceId))
                    {
                        compatibleDevice = _filters.Any(a => device.Name.CaseInsensitiveContains(a));
                    }
                }
            }
            catch
            {
                compatibleDevice = false;
            }

            return compatibleDevice;
        }

        public void Start()
        {
            _deviceWatcher = DeviceInformation.CreateWatcher(
                        GetSelector(deviceSelector),
                        requestedProperties,
                        DeviceInformationKind.AssociationEndpoint);

            _deviceWatcher.Added += Watcher_Added;
            _deviceWatcher.Updated += Watcher_Updated;
            _deviceWatcher.Removed += Watcher_Removed;
            _deviceWatcher.EnumerationCompleted += Watcher_EnumerationCompleted;
            _deviceWatcher.Stopped += Watcher_Stopped;

            _deviceWatcher.Start();
        }

        public void Stop()
        {
            if (_deviceWatcher != null)
            {
                // Unregister the event handlers.
                _deviceWatcher.Added -= Watcher_Added;
                _deviceWatcher.Updated -= Watcher_Updated;
                _deviceWatcher.Removed -= Watcher_Removed;
                _deviceWatcher.EnumerationCompleted -= Watcher_EnumerationCompleted;
                _deviceWatcher.Stopped -= Watcher_Stopped;

                // Stop the watcher.
                _deviceWatcher.Stop();
                _deviceWatcher = null;
            }
        }
    }

    public async DevicePairingResultStatus PairDevice(BluetoothLEDeviceDisplay deviceInfoDisp)
    {
        DevicePairingResult result = await deviceInfoDisp.DeviceInformation.Pairing.PairAsync();
        return result.Status;
    }

    public async DeviceUnpairingResultStatus UnpairDevice(BluetoothLEDeviceDisplay deviceInfoDisp)
    {
        DeviceUnpairingResult result = await deviceInfoDisp.DeviceInformation.Pairing.UnpairAsync();
        return result.Status;
    }
}