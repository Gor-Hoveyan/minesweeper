import { useForm, SubmitHandler } from "react-hook-form";

interface ComponentProps {
  generateTable: (rows: number, cols: number) => void;
}

type FormValues = {
  rows: number;
  cols: number;
  mines: number;
};

export default function CreationForm({ generateTable }: ComponentProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onChange",
  });
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    generateTable(data.rows, data.cols);
  };
  return (
    <div className="mr-5">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <input
          type="number"
          {...register("rows", {
            min: { value: 3, message: "Rows can't be less than 3" },
            max: { value: 24, message: "Rows can't be more than 24" },
          })}
          placeholder="Rows"
          className="my-1 p-2 rounded-md text-black"
        />
        {errors.rows?.message ? (
          <p className="text-red-500">{errors.rows.message}</p>
        ) : (
          ""
        )}
        <input
          type="number"
          {...register("cols", {
            min: { value: 3, message: "Columns can't be less than 3" },
            max: { value: 24, message: "Columns can't be more than 24" },
          })}
          placeholder="Columns"
          className="my-1 p-2 rounded-md text-black"
        />
        {errors.cols?.message ? (
          <p className="text-red-500">{errors.cols.message}</p>
        ) : (
          ""
        )}
        <input
          type="number"
          placeholder="Mines"
          className="my-1 p-2 rounded-md text-black"
        />
        {errors.mines?.message ? (
          <p className="text-red-500">{errors.mines.message}</p>
        ) : (
          ""
        )}
        <button className="bg-blue-500 rounded-md p-2 my-1 text-white">
          Generate field
        </button>
      </form>
    </div>
  );
}
