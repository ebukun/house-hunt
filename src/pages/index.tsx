import type { NextPage } from "next";
import Layout from "components/layout";
import Map from "components/map";

const Home: NextPage = () => {
	return (
		<Layout
			main={
				<div className="flex homepage">
					<div className="w-1/2 pb-4 homepage--house-list">HouseList</div>
					<div className="w-1/2">
						<Map />
					</div>
				</div>
			}
		/>
	);
};

export default Home;
