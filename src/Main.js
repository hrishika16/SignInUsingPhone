import React, { useState } from "react";
import {
	LinkedinShareButton,
	LinkedinIcon,
	FacebookShareButton,
	FacebookIcon,
	TwitterShareButton,
	TwitterIcon
} from "react-share";

function Main() {
	const [blog, setBlog] = useState("");
	const [list, setItems] = useState([]);
	const shareUrl = `${window.location.origin}?blog=${blog}`;

	const handleBlog = () => {
		if (!blog) {
			alert("Please Write something");
			return;
		}
		const arr = {
			id: Math.floor(Math.random() * 100),
			value: blog,
			date: new Date().toLocaleString()
		};
		setItems((oldList) => [...oldList, arr]);
		setBlog("");
	};

	// const handleList = (id) =>{
	// 	console.log(`show data ${window.location.origin}?blog=${id}`);
	// }

	return (
		<div className="w-80">
			<h2 className="text-center leading-normal text-slate-700 font-medium text-3xl mb-6">
				Blogger Page
			</h2>
			<textarea
				type="text"
				className="resize-none w-full flex items-center justify-center h-32 rounded shadow-xl outline-none p-1"
				value={blog}
				onChange={(e) => setBlog(e.target.value)}
				placeholder="Write you blog here..."
			/>
			<button
				className="w-full flex font-semibold text-lg items-center justify-center bg-neutral-50 text-slate-700 p-0.5 rounded-full my-4"
				onClick={() => handleBlog()}>
				Send
			</button>
			{list.map((item) => (
				<div
					className="w-full w-fit p-2 shadow-xl rounded my-4 bg-white"
					key={item.id}>
					<p className="text-sm mb-1">{item.value}</p>
					<p className="text-xs mb-1">{item.date}</p>
					<div className="flex justify-start">
						<LinkedinShareButton
							url={`${window.location.origin}?blog=${item.id}`}
							className="mr-1">
							<LinkedinIcon size={22} className="rounded-full" />
						</LinkedinShareButton>
						<FacebookShareButton url={shareUrl} className="mr-1">
							<FacebookIcon size={22} className="rounded-full" />
						</FacebookShareButton>
						<TwitterShareButton url={shareUrl}>
							<TwitterIcon size={22} className="rounded-full" />
						</TwitterShareButton>
					</div>
				</div>
			))}
		</div>
	);
}

export default Main;
