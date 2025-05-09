import "./phone-shell.css";

export default function PhoneShell({ children }) {
  return (
    <div className="phone-frame">
      {children}
    </div>
  );
}