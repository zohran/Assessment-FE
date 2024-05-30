import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Button } from "./Button";

export default function LoadingButton() {
  return (
    <Button className="mt-4 w-full ">
      Loading <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
