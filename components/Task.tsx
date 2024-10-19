interface TaskProps {
    title: string;
    date: string;
}

export function Task(props: TaskProps) {
    return (
        <div className="border-b border-gray-300 pb-4 mb-4 px-12">
            <p className="text-lg">{props.title}</p>
            <p className="text-sm text-blue-500">{props.date}</p>
        </div>
    );
}
