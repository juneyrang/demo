using System;
using System.Security.Cryptography;

namespace Locker.Bluetooth.Core
{
    public class PacketHelper
    {
        #region Locker Packet
        public static readonly byte[] PACKET_LOCKER_TOKEN = new byte[] { 0x06, 0x01, 0x01, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 };

        public static readonly byte[] PACKET_LOCKER_OPEN = new byte[] { 0x05, 0x01, 0x06 };
        public static readonly byte[] PACKET_LOCKER_CLOSE = new byte[] { 0x05, 0x0C, 0x01, 0x01 };
        public static readonly byte[] PACKET_LOCKER_STATUS = new byte[] { 0x05, 0x0E, 0x01, 0X01 };
        public static readonly byte[] PACKET_LOCKER_BATTERY = new byte[] { 0x02, 0x01, 0x01, 0x01 };
        public static readonly byte[] PACKET_LOCKER_CHANGE_PASSWORD = new byte[] { 0x05, 0x03, 0x06 };
        public static readonly byte[] PACKET_LOCKER_TIME_CLOSED = new byte[] { 0x06, 0x05, 0x01, 0x01 };

        public static readonly byte[] PACKET_LOCKER_PASSWORD = new byte[] { 0x30, 0x30, 0x30, 0x30, 0x30, 0x30 };
        #endregion

        public static byte[] GetTokenPacket(int[] deviceKey)
        {
            byte[] byteToken = { 0x06, 0x01, 0x01, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 };
            byte[] encryptBytes = Encrypt(byteToken, intToByte(deviceKey));

            Debug.WriteLine($"deviceKey String : {deviceKey}");
            Debug.WriteLine($"KEY_LOCKER_OKGSS101 String : {ByteToHex(intToByte(deviceKey))}");
            return encryptBytes;
        }

        public static byte[] GetLockerPacket(PacketType packetType, int[] deviceKey, byte[] token, byte[] password = null)
        {
            int index = 0;
            byte[] bytesPacket = new byte[16];
            switch (packetType)
            {
                case PacketType.LOCKER_OPEN :
                {
                    Array.Copy(PACKET_LOCKER_OPEN, 0, byteOpenLock, index, PACKET_LOCKER_OPEN.Length);
                    index += PACKET_LOCKER_OPEN.Length;
                }
                break;
                case PacketType.LOCKER_CLOSE :
                {
                    Array.Copy(PACKET_LOCKER_CLOSE, 0, byteOpenLock, index, PACKET_LOCKER_CLOSE.Length);
                    index += PACKET_LOCKER_CLOSE.Length;
                }
                break;
                case PacketType.LOCKER_STATUS :
                {
                    Array.Copy(PACKET_LOCKER_STATUS, 0, byteOpenLock, index, PACKET_LOCKER_STATUS.Length);
                    index += PACKET_LOCKER_STATUS.Length;
                }
                break;
                case PacketType.LOCKER_BATTERY :
                {
                    Array.Copy(PACKET_LOCKER_BATTERY, 0, byteOpenLock, index, PACKET_LOCKER_BATTERY.Length);
                    index += PACKET_LOCKER_BATTERY.Length;
                }
                break;
                case PacketType.LOCKER_CHANGE_PASSWORD :
                {
                    Array.Copy(PACKET_LOCKER_CHANGE_PASSWORD, 0, byteOpenLock, index, PACKET_LOCKER_CHANGE_PASSWORD.Length);
                    index += PACKET_LOCKER_CHANGE_PASSWORD.Length;
                }
                break;
                case PacketType.LOCKER_TIME_CLOSED :
                {
                    Array.Copy(PACKET_LOCKER_TIME_CLOSED, 0, byteOpenLock, index, PACKET_LOCKER_TIME_CLOSED.Length);
                    index += PACKET_LOCKER_TIME_CLOSED.Length;
                }
                break;
            }
            if(packetType == PacketType.LOCKER_OPEN || packetType == PacketType.LOCKER_CHANGE_PASSWORD)
            {
                Array.Copy(LockerPassword, 0, byteOpenLock, index, LockerPassword.Length);
                index += LockerPassword.Length;
            }
            Array.Copy(token, 0, byteOpenLock, index, token.Length);

            byte[] encryptBytes = Encrypt(byteOpenLock, intToByte(deviceKey));
            return encryptBytes;
        }

        public static byte[] LockOpenPacket(byte[] password, byte[] token, int[] deviceKey)
        {
            byte[] LockerPassword = password == null ? PACKET_LOCKER_PASSWORD : password;
            byte[] byteOpenLock = new byte[PACKET_LOCKER_OPEN.Length + LockerPassword.Length + token.Length];
            int index = 0;
            Array.Copy(PACKET_LOCKER_OPEN, 0, byteOpenLock, index, PACKET_LOCKER_OPEN.Length);
            index += PACKET_LOCKER_OPEN.Length;
            Array.Copy(LockerPassword, 0, byteOpenLock, index, LockerPassword.Length);
            index += LockerPassword.Length;
            Array.Copy(token, 0, byteOpenLock, index, token.Length);

            byte[] encryptBytes = Encrypt(byteOpenLock, intToByte(deviceKey));
            return encryptBytes;
        }

        public static byte[] LockClosePacket(byte[] token, int[] deviceKey)
        {
            byte[] byteOpenLock = new byte[PACKET_LOCKER_CLOSE.Length + token.Length];
            int index = 0;
            Array.Copy(PACKET_LOCKER_CLOSE, 0, byteOpenLock, index, PACKET_LOCKER_CLOSE.Length);
            index += PACKET_LOCKER_CLOSE.Length;
            Array.Copy(token, 0, byteOpenLock, index, token.Length);

            byte[] encryptBytes = Encrypt(byteOpenLock, intToByte(deviceKey));
            return encryptBytes;
        }

        public static byte[] LockStatusPacket(byte[] token, int[] deviceKey)
        {
            byte[] byteOpenLock = new byte[PACKET_LOCKER_STATUS.Length + token.Length];
            int index = 0;
            Array.Copy(PACKET_LOCKER_STATUS, 0, byteOpenLock, index, PACKET_LOCKER_STATUS.Length);
            index += PACKET_LOCKER_STATUS.Length;
            Array.Copy(token, 0, byteOpenLock, index, token.Length);

            byte[] encryptBytes = Encrypt(byteOpenLock, intToByte(deviceKey));
            return encryptBytes;
        }

        public static byte[] LockBatteryPacket(byte[] token, int[] deviceKey)
        {
            byte[] byteOpenLock = new byte[PACKET_LOCKER_BATTERY.Length + token.Length];
            int index = 0;
            Array.Copy(PACKET_LOCKER_BATTERY, 0, byteOpenLock, index, PACKET_LOCKER_BATTERY.Length);
            index += PACKET_LOCKER_BATTERY.Length;
            Array.Copy(token, 0, byteOpenLock, index, token.Length);

            byte[] encryptBytes = Encrypt(byteOpenLock, intToByte(deviceKey));
            return encryptBytes;
        }

        private static byte[] Encrypt(byte[] EncryptArray, byte[] KeyArray)
        {
            RijndaelManaged Rdel = new RijndaelManaged();
            Rdel.Mode = CipherMode.ECB;
            Rdel.Padding = PaddingMode.Zeros;
            //Rdel.KeySize = 128;
            Rdel.Key = KeyArray;

            ICryptoTransform CtransForm = Rdel.CreateEncryptor();
            byte[] ResultArray = CtransForm.TransformFinalBlock(EncryptArray, 0, EncryptArray.Length);

            string hexString = ByteToHex(ResultArray);

            return HexToByte(hexString);
        }

        public static byte[] Decrypt(byte[] DecryptArray, byte[] KeyArray)
        {
            RijndaelManaged Rdel = new RijndaelManaged();
            Rdel.Mode = CipherMode.ECB;
            Rdel.Padding = PaddingMode.Zeros;
            //Rdel.KeySize = 128;
            Rdel.Key = KeyArray;

            ICryptoTransform CtransForm = Rdel.CreateDecryptor();
            byte[] ResultArray = CtransForm.TransformFinalBlock(DecryptArray, 0, DecryptArray.Length);

            return ResultArray;
        }

        private static byte[] intToByte(int[] intArray)
        {
            byte[] hexByteArray = new byte[intArray.Length];
            for (int i = 0; i < intArray.Length; i++)
            {
                hexByteArray[i] = (byte)intArray[i];
            }
            return hexByteArray;
        }

    }
}