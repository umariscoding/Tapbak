import React from "react";
import { Table as AntTable } from "antd";

function Table({ headers, data, rowKey = "id", scroll, style, ...props }) {

  const columns = headers.map((header) => ({
    title: header.label,
    dataIndex: header.key || header.label.toLowerCase().replace(/\s+/g, '_'),
    key: header.key || header.label.toLowerCase().replace(/\s+/g, '_'),
    className: header.className,
    render: header.render,
    sorter: header.sorter,
    sortDirections: header.sortDirections,
    width: header.width,
    fixed: header.fixed,
    ellipsis: header.ellipsis,
    ...header
  }));

  return (
    <AntTable
      columns={columns}
      dataSource={data}
      rowKey={rowKey}
      pagination={{
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        defaultPageSize: 10,
        pageSizeOptions: ['10', '20', '50', '100']
      }}
      scroll={scroll}
      style={{ width: '100%', ...style }}
      tableLayout="fixed"
      {...props}
    />
  );
}

export default Table;
