import './input.style.css';

export function Input({ icon: Icon, ...props }) {
  return (
    <div className="container_input">
      {Icon && <Icon size={24} />}
      <input className="input_information" {...props} />
    </div>
  );
}
