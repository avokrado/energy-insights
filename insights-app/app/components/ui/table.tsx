import React from "react";

export type Column<T> = {
  header: string;
  accessor: keyof T;
};

type GenericTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  onUpdate?: (row: T) => React.ReactNode;
  onDelete?: (row: T) => React.ReactNode;
};

function GenericTable<T extends { id: string | number }>({
  columns,
  data,
  onUpdate,
  onDelete,
}: GenericTableProps<T>) {
  return (
    <div className="border border-gray-200 shadow-sm rounded-lg">
      <div className="max-h-[600px] overflow-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="sticky top-0 z-10">
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.accessor)}
                  className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider bg-gray-50"
                >
                  {col.header}
                </th>
              ))}
              <th className="bg-gray-50" />
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                {columns.map((col) => (
                  <td
                    key={String(col.accessor)}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                  >
                    {String(row[col.accessor])}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center justify-end gap-2">
                    {onUpdate && onUpdate(row)}
                    {onDelete && onDelete(row)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GenericTable;
