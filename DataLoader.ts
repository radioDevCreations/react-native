import axios from "axios";

interface DataCache {
	[url: string]: any;
}

class DataLoader {
	private static instance: DataLoader | null = null;
	private dataCache: DataCache;

	private constructor() {
		this.dataCache = {};
	}

	public static getInstance(): DataLoader {
		if (!DataLoader.instance) {
			DataLoader.instance = new DataLoader();
		}
		return DataLoader.instance;
	}

	public async fetchData(url: string): Promise<any> {
		if (this.dataCache[url]) {
			return Promise.resolve(this.dataCache[url]);
		}

		try {
			const response = await axios.get(url);
			const data = response.data;
			this.dataCache[url] = data;
			return data;
		} catch (error) {
			console.error("Data fetching failed:", error);
			throw error;
		}
	}

	public clearCache(): void {
		this.dataCache = {};
	}
}

export default DataLoader;
