import { useState, useEffect, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import GoogleInput from "./forms/googleInput";

interface FormData {
	address: string;
	latitude: number | null;
	longitude: number | null;
	bedrooms: string;
	image: FileList;
}

interface Props {}

const HouseForm = (props: Props) => {
	const [status, setStatus] = useState<string>("idle");
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
		watch,
	} = useForm<FormData>({ defaultValues: {} });

	const address = watch("address");

	useEffect(() => {
		register("address", { required: "Please enter your address" });
		register("latitude", { required: true, min: -90, max: 90 });
		register("longitude", { required: true, min: -180, max: 180 });
		register("bedrooms", { required: true, min: 1, max: 10 });
		register("image", { required: true });
	}, [register]);

	async function createHouse(data: FormData) {}

	const onSubmit = (data: FormData) => {
		setStatus("loading");
		createHouse(data);
	};

	return (
		<form className="mx-auto max-w-xl py-4" onSubmit={handleSubmit(onSubmit)}>
			<h1 className="text-xl">Add a New House</h1>

			<div className="mt-4">
				<label htmlFor="search" className="block">
					Search for your address
				</label>
				<GoogleInput
					onSelectAddress={(address, latitude, longitude) => {
						setValue("address", address);
						setValue("latitude", latitude);
						setValue("longitude", longitude);
					}}
					defaultValue={""}
				/>
				{errors.address && <p>{errors.address.message}</p>}
			</div>
		</form>
	);
};

export default HouseForm;
