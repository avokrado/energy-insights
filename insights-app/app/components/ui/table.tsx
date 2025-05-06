import React from "react";
import DeleteDevice from "../delete-device";

export type Column<T> = {
  header: string;
  accessor: keyof T;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
};

type GenericTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  onCreate?: () => void;
  onUpdate?: (row: T) => React.ReactNode;
  onDelete?: (row: T) => React.ReactNode;
};

function GenericTable<T extends { id: string | number }>({
  columns,
  data,
  onCreate,
  onUpdate,
  onDelete,
}: GenericTableProps<T>) {
  return (
    <div className="overflow-x-auto">
      {onCreate && (
        <div className="mb-4">
          <button
            onClick={onCreate}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Add New
          </button>
        </div>
      )}
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            {columns.map((col) => (
              <th
                key={String(col.accessor)}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {col.header}
              </th>
            ))}
            <th />
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {columns.map((col) => (
                <td
                  key={String(col.accessor)}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                >
                  {col.render
                    ? col.render(row[col.accessor], row)
                    : String(row[col.accessor])}
                </td>
              ))}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                {onUpdate && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                    {onUpdate(row)}
                  </td>
                )}
                {onDelete && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                    {onDelete(row)}
                  </td>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GenericTable;
