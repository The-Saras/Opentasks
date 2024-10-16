"use client";

export function TodoCmp(props: any) {
  return (
    <div className="flex-1 bg-white p-1 shadow-sm">
      <ul className="space-y-2">
        <li className="p-2 bg-gray-50 border border-gray-200 rounded-md shadow-sm hover:bg-gray-100 transition-colors">
          {props.title}
        </li>
      </ul>
    </div>
  );
}
