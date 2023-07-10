const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			//login
			login: async function(username, password) {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}api/login`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({ username: username, password: password })
					});
					const data = await response.json();
					setStore({ user: data.user_id, token: data.access_token }); 
					if (!response.ok) {
						throw new Error(data.message);
					}			
					return true;
				} catch (err) {
					console.error(err);
					return false;
				}
			},
			

			//logout
			logout: function() {
				setStore({ user: null, token: null });
			},
			
      //signup 
	  signup: async function(username, password) {
		try {
			const response = await fetch(`${process.env.BACKEND_URL}api/signup`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ username: username, password: password })
			});
			const data = await response.json(); 
	
			if (!response.ok) {
				throw new Error(data.message);
			}
	
			setStore({ user: data });
	
			return true;
		} catch (err) {
			console.error(err);
			return false;
		}
	},
	
	//login
	getMessage: async () => {
		try {
			// fetching data from the backend
			const resp = await fetch(`${process.env.BACKEND_URL}/api/hello`);
			const data = await resp.json();
			setStore({ message: data.message });
			// don't forget to return something, that is how the async resolves
			return data;
		} catch (error) {
			console.log("Error loading message from backend", error);
		}
	},
	
			changeColor: (index, color) => {
				const store = getStore();
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
