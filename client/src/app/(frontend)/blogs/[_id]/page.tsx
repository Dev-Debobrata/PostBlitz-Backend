import { getBlog } from "@/helpers/getBlog";
import { IBlog } from "@/utils/types";

interface Params {
  params: {
    _id: string;
  };
}

export default async function Page({ params: { _id } }: Params) {
  const data: IBlog | undefined = await getBlog(_id);

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[100vh]">
      <h1 className="text-4xl font-bold text-center">{data?.title}</h1>
      <p className="mt-4 text-lg font-medium text-center">
        {data?.categories.join(", ")}
      </p>
      <div className="mt-4 mx-40">{data?.content}</div>
    </div>
  );
}
