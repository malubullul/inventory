"use client";

import { RackDataTable } from "./rack-data-table";
import { RackStatusBadge } from "./rack-status-badge";
import type { RackPagination, RackRecord } from "./rack-types";
import { toggleRackStatus } from "./rack-actions";
import { RackForm } from "./rack-form";

type RackTableProps = { records: RackRecord[]; pagination: RackPagination };

export function RackTable({ records, pagination }: RackTableProps) {
  return (
    <RackDataTable
      records={records}
      pagination={pagination}
      entityLabel="Rak"
      searchPlaceholder="Cari kode, nama, atau deskripsi rak"
      emptyDescription="Tambahkan rak untuk menyusun barang inventaris."
      onToggleStatus={toggleRackStatus}
      renderForm={(record, onSuccess) => <RackForm record={record} onSuccess={onSuccess} />}
      columns={[
        { header: "Kode", render: (record) => <span className="font-mono text-xs font-medium">{record.code}</span> },
        { header: "Rak", render: (record) => <span className="font-medium">{record.name}</span> },
        { header: "Status", render: (record) => <RackStatusBadge isActive={record.isActive} /> },
      ]}
    />
  );
}
