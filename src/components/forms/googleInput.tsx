import { ChangeEvent } from "react";
import usePlacesAutocomplete, {
	getGeocode,
	getLatLng,
} from "use-places-autocomplete";
import { useGoogleMapsScript, Libraries } from "use-google-maps-script";
import {
	Combobox,
	ComboboxInput,
	ComboboxPopover,
	ComboboxList,
	ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

interface Props {
	onSelectAddress: (
		address: string,
		latitude: number | null,
		longitude: number | null,
	) => void;
	defaultValue: string;
}

const libraries: Libraries = ["places"];

export default function GoogleInput({ onSelectAddress, defaultValue }: Props) {
	const { isLoaded, loadError } = useGoogleMapsScript({
		googleMapsApiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY as string,
		libraries,
	});

	if (!isLoaded) return null;
	if (loadError) return <div>Error loading</div>;

	return (
		<SearchBox onSelectAddress={onSelectAddress} defaultValue={defaultValue} />
	);
}

const SearchBox = ({ onSelectAddress, defaultValue }: Props) => {
	const {
		ready,
		value,
		setValue,
		suggestions: { status, data },
		clearSuggestions,
	} = usePlacesAutocomplete({ debounce: 300, defaultValue });

	const handleSelect = async (address: string) => {
		setValue(address, false);
		clearSuggestions();

		try {
			const results = await getGeocode({ address });
			const { lat, lng } = getLatLng(results[0]);
			onSelectAddress(address, lat, lng);
		} catch (error) {}
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
		if (e.target.value === "") {
			onSelectAddress("", null, null);
		}
	};

	return (
		<Combobox onSelect={handleSelect}>
			<ComboboxInput
				id="search"
				placeholder="Enter your location"
				className="w-full p-2 text-black focus:outline-none  focus:ring-1 "
				value={value}
				onChange={handleChange}
				disabled={!ready}
				autoComplete="off"
			/>
			<ComboboxPopover>
				<ComboboxList>
					{status === "OK" &&
						data.map(({ place_id, description }) => (
							<ComboboxOption key={place_id} value={description} />
						))}
				</ComboboxList>
			</ComboboxPopover>
		</Combobox>
	);
};
