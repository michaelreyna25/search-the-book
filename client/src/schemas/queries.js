import { gql } from "@apollo/client";

export const GET_ME = gql`
	query Query {
		me {
			_id
			username
			email
			bookCount
			savedBooks {
				bookId
				authors
				title
				image
				link
			}
		}
	}
`;