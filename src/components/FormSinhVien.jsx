import React, { useState } from "react";
import { useFormik } from "formik";
import { Select } from "antd";
import CustomButton from "./CustomButton";
import CustomInput from "./CustomInput";
import TableSinhVien from "./TableSinhVien";
import utils from "../utils/utils";

const FormSinhVien = () => {
  const [arrSV, setArrSV] = useState([]);
  const [arrFilter, setArrFilter] = useState([...arrSV]);
  const [isSearching, setIsSearching] = useState(false);
  const [updateMSSV, setUpdateMSSV] = useState(false);
  const [editDataSV, setEditDataSV] = useState(true);
  const {
    setFieldValue,
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    errors,
    touched,
    resetForm,
    setErrors,
    setTouched,
  } = useFormik({
    initialValues: {
      mssv: "",
      name: "",
      email: "",
      phone: "",
      sex: "",
    },
    onSubmit: (sinhVien) => {
      setArrSV([...arrSV, sinhVien]);
      setIsSearching(false);

      resetForm();
    },
    validationSchema: utils.validationForm,
  });

  const deleteSV = (maso) => {
    const newArrSV = [...arrSV];
    let index = newArrSV.findIndex((item) => item.mssv === maso);
    if (index != -1) {
      newArrSV.splice(index, 1);

      setArrFilter([[]]);
      setArrSV(newArrSV);
    }
  };
  const editSV = (record) => {
    setFieldValue("mssv", record.mssv);
    setFieldValue("name", record.name);
    setFieldValue("email", record.email);
    setFieldValue("phone", record.phone);
    setFieldValue("sex", record.sex);
    setUpdateMSSV(true);
    setEditDataSV(false);
  };
  const updateSV = (maso) => {
    let newArrSV = [...arrSV];
    let index = newArrSV.findIndex((item) => item.mssv === maso);
    if (index != -1) {
      try {
        utils.validationForm.validateSync(values, { abortEarly: false });
        newArrSV[index] = values;
        setArrFilter([newArrSV[index]]);
        setArrSV(newArrSV);
        setUpdateMSSV(false);
        setEditDataSV(true);
        resetForm();
      } catch (err) {
        let arrErrors = err.inner.reduce((item, error) => {
          item[error.path] = error.message;
          return item;
        }, {});
        const arrTouched = Object.keys(arrErrors).reduce((item, key) => {
          item[key] = true;
          return item;
        }, {});
        setTouched(arrTouched);
        setErrors(arrErrors);
      }
    }
  };
  const searchSV = (name) => {
    let txt = utils.removeVietnameseTones(name).trim().toLowerCase();
    let arrSearch = arrSV.filter((item, index) => {
      let searchName = utils
        .removeVietnameseTones(item.name)
        .trim()
        .toLowerCase();
      return searchName.includes(txt);
    });
    setIsSearching(true);
    setArrFilter(arrSearch);
    return arrSearch;
  };

  return (
    <>
      <div className="container mx-auto grid grid-cols-1 gap-y-10">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-x-10 gap-y-4">
            <CustomInput
              labelContent={"MSSV"}
              placeholder={"Mã số từ 4-8 ký tự"}
              id={"mssv"}
              name={"mssv"}
              value={values.mssv}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors.mssv}
              touched={touched.mssv}
              readOnly={updateMSSV}
            />
            <CustomInput
              labelContent={"Họ và Tên"}
              placeholder={"Nguyễn Văn A"}
              id={"name"}
              name={"name"}
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors.name}
              touched={touched.name}
            />
            <CustomInput
              labelContent={"Email"}
              placeholder={"example@gmail.com"}
              id={"email"}
              name={"email"}
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors.email}
              touched={touched.email}
            />
            <CustomInput
              labelContent={"Số điện thoại"}
              placeholder={"(+84) 0-XXXX-XXXX"}
              id={"phone"}
              name={"phone"}
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors.phone}
              touched={touched.phone}
            />
          </div>
          <div>
            <label
              htmlFor="Giới Tính"
              className="block mt-5 text-sm font-medium"
            >
              Sex
            </label>
            <Select
              placeholder="Xin chọn giới tính"
              value={values.sex}
              optionFilterProp="label"
              onChange={(value) => {
                setFieldValue("sex", value);
              }}
              options={[
                { value: "", label: "Xin chọn giới tính" },
                {
                  value: "Nam",
                  label: "Nam",
                },
                {
                  value: "Nữ",
                  label: "Nữ",
                },
              ]}
            />
            <p
              className={`text-red-500 h-3 ${
                errors.sex && touched.sex ? "visible" : "invisible"
              }`}
            >
              {errors.sex}
            </p>
          </div>
          <div className="mt-5 space-x-5">
            <CustomButton
              content={"Thêm Sinh Viên"}
              type="submit"
              isDisabled={!editDataSV}
            />
            <CustomButton
              content={"Cập nhật Sinh Viên"}
              bgClr="bg-blue-400"
              isDisabled={editDataSV}
              onClick={() => updateSV(values.mssv)}
            />
          </div>
        </form>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="inputSearch"
            className="block mb-2 text-sm font-medium"
          >
            Tìm kiếm sinh viên
          </label>
          <div className="flex items-center justify-between border border-black rounded-md w-[300px]">
            <input
              type="text"
              id="inputSearch"
              className="flex-1 focus:border-none focus:outline-none px-2"
              placeholder="Nguyễn Văn A"
              onInput={(e) => {
                if (e.target.value.trim() !== "") {
                  setIsSearching(true);
                  searchSV(e.target.value);
                } else {
                  setIsSearching(false);
                }
              }}
            />
            <button className="bg-blue-500 text-white p-2 text-sm rounded-e-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14"
                />
              </svg>
            </button>
          </div>
        </div>
        <div>
          <TableSinhVien
            data={isSearching ? arrFilter : arrSV}
            handleDeleteSV={deleteSV}
            handleEditSV={editSV}
            handleDisable={editDataSV}
          />
        </div>
      </div>
    </>
  );
};

export default FormSinhVien;
