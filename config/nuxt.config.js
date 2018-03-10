module.exports = {
	head: {
		script: [
			// { src: "https://unpkg.com/xlsx/dist/shim.min.js" }, // CDN
			// { src: "https://unpkg.com/xlsx/dist/xlsx.full.min.js" } // CDN
			{ src: "/assets/js/shim.js" }, // development
			{ src: "/assets/js/xlsx.full.min.js" } // development
		]
	}
};
