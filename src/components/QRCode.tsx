import { QRCodeSVG } from "qrcode.react";

const QRCode = () => (
  <div className="flex flex-col items-center gap-4 py-6">
    <p className="text-sm font-semibold uppercase tracking-wider text-text-secondary">
      Scan to visit our website
    </p>
    <div className="bg-white p-4 rounded-2xl shadow-lg">
      <QRCodeSVG
        value="https://lyndamichellemed.lovable.app"
        size={180}
        bgColor="#ffffff"
        fgColor="#0a0a12"
        level="H"
        includeMargin={false}
      />
    </div>
    <p className="text-xs text-text-secondary/60">lyndamichellemed.lovable.app</p>
  </div>
);

export default QRCode;
