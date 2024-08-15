import React from "react";
import { Table, Tag } from "antd";
import CustomButton from "./CustomButton";

const TableSinhVien = ({ data, handleDeleteSV, handleEditSV }) => {
  const dataSource = data.map((item, index) => ({
    ...item,
    key: index,
  }));
  const columns = [
    {
      title: "Mã số sinh viên",
      dataIndex: "mssv",
      key: "mssv",
    },
    {
      title: "Họ và Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Giới tính",
      key: "sex",
      dataIndex: "sex",
      render: (text, record, index) => (
        <>
          <Tag color={text == "Nam" ? "magenta" : "geekblue"}>{text}</Tag>
        </>
      ),
      filters: [
        {
          text: "Nam",
          value: "Nam",
        },
        {
          text: "Nữ",
          value: "Nữ",
        },
      ],
      filterSearch: true,
      onFilter: (value, record) => record.sex.includes(value),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Chức năng",
      key: "action",
      render: (text, record, index) => (
        <>
          <div className="flex gap-3">
            <CustomButton
              content={"Xóa"}
              bgClr="bg-red-500"
              onClick={() => handleDeleteSV(record.mssv)}
            />
            <CustomButton
              content={"Sửa"}
              bgClr="bg-blue-500"
              onClick={() => handleEditSV(record)}
            />
          </div>
        </>
      ),
    },
  ];
  return <Table columns={columns} dataSource={dataSource} />;
};

export default TableSinhVien;
