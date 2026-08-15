import { QRCodeSVG } from "qrcode.react";

const QRCodePage = () => (
  <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
    <h1 className="text-2xl font-bold text-gray-900 mb-1">Lynda Michelle Medical Centre</h1>
    <p className="text-sm text-gray-500 mb-8">Smart Clinic AI</p>
    <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100">
      <QRCodeSVG
        value="https://lyndamichellemed.lovable.app"
        size={400}
        bgColor="#ffffff"
        fgColor="#0a0a12"
        level="H"
        includeMargin={false}
      />
    </div>
    <p className="mt-6 text-xs text-gray-400">lyndamichellemed.lovable.app</p>
    <p className="mt-2 text-xs text-gray-400">Right-click the QR code → "Save image as..." to download</p>
  </div>
);

export default QRCodePage;
