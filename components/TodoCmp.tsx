
"use client";

export function TodoCmp(props:any) {
  return (
    <div className="p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-md space-y-2">
      <p className="text-xl font-semibold text-gray-800">{props.title}</p>
      <p className="text-gray-700">{props.desc}</p>
    </div>
  );
}
