import { gql } from "apollo-boost";

export const GET_USER = gql`
	query($id: ID) {
		user(id: $id) {
			id,
			game {
				config,
				state,
			}
		}
	}
`;

export const ADD_USER = gql`
	mutation($config: String!, $state: String!) {
		addUser(config: $config, state: $state) {
			id
		}
	}
`;
