export default function TandaTangan({ createdAt }: { createdAt: string }) {
  return (
    <div className="flex justify-end mt-20">
      <div className="text-center">
        <p>Medan, {createdAt}</p>
        <p>Apoteker,</p>
        <div className="h-24" />
        <p className="font-semibold underline">
          Bidan Santi Meliala, S.Keb., Bd
        </p>
        <p>SIP. 12345678</p>
      </div>
    </div>
  );
}
