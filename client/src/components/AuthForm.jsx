import { useState } from "react";

function AuthForm({ title, subtitle, fields, onSubmit, submitLabel, error, loading }) {
  const [form, setForm] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: field.defaultValue || "" }), {})
  );

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="mx-auto max-w-md rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
      <h1 className="font-display text-4xl text-white">{title}</h1>
      <p className="mt-3 text-slate-300">{subtitle}</p>
      <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
        {fields.map((field) => (
          <input
            key={field.name}
            type={field.type}
            name={field.name}
            value={form[field.name]}
            onChange={handleChange}
            placeholder={field.placeholder}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
            required
          />
        ))}
        {error ? <p className="text-sm text-rose-400">{error}</p> : null}
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-white px-6 py-3 font-medium text-slate-950 disabled:opacity-60"
        >
          {loading ? "Please wait..." : submitLabel}
        </button>
      </form>
    </div>
  );
}

export default AuthForm;
