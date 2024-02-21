import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Datepicker from "react-tailwindcss-datepicker";
import { shortMonthFormat } from "../../utils/dateFormatter";

const DatePickerComponent = ({ date, updateForm, handleDateValue }) => {
     const colorTheme = useSelector((state) => state.theme.color.mainColor);
     const [value, setValue] = useState({
          startDate: date ?? null,
          endDate: date ?? null,
     });

     const handleValueChange = (newValue) => {
          if (
               shortMonthFormat(new Date(newValue.startDate)) ===
               shortMonthFormat(new Date(value.startDate))
          )
               setValue({
                    startDate: null,
                    endDate: null,
               });
          else setValue(newValue);
     };

     useEffect(() => {
          if (updateForm) {
               const oldValue = value.startDate
                    ? shortMonthFormat(new Date(value.startDate))
                    : undefined;
               if (date === oldValue) updateForm(false);
               else updateForm(true);
          }
     }, [date, value, updateForm]);

     useEffect(() => {
          handleDateValue({ date: value });
     }, [date, value, handleDateValue]);

     return (
          <Datepicker
               useRange={false}
               asSingle={true}
               value={value}
               onChange={handleValueChange}
               inputClassName="w-full border-2 border-gray-300 dark:border-gray-700
               rounded-lg hover:border-gray-800 dark:hover:border-gray-300
               hover:bg-gray-800 dark:hover:bg-gray-200 text-center focus:outline-none bg-transparent 
               p-2 dark:hover:text-gray-700 hover:text-gray-300 hover:placeholder:text-gray-300 dark:hover:placeholder:text-gray-700 text-gray-600 dark:text-gray-200 placeholder:text-gray-600 dark:placeholder:text-gray-400 cursor-pointer"
               placeholder="Due Date"
               toggleClassName="hidden"
               containerClassName="w-4/5 sm:w-4/5 md:w-2/5 lg:w-2/5 mx-auto sm:mx-auto md:mx-0 lg:mx-0"
               primaryColor={colorTheme}
               startWeekOn="sat"
               readOnly={true}
               minDate={new Date()}
               displayFormat={"DD MMM YYYY"}
               popoverDirection="down"
               inputName="date"
          />
     );
};
export default DatePickerComponent;
