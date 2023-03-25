import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
	mutation Mutation($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			user {
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
			token
		}
	}
`;

export const ADD_USER = gql`
	mutation Mutation($username: String!, $email: String!, $password: String!) {
		addUser(username: $username, email: $email, password: $password) {
			user {
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
			token
		}
	}
`;

export const SAVE_BOOK = gql`
	mutation SaveBook(
		$bookId: ID!
		$title: String!
		$description: String!
		$image: String!
		$link: String!
		$authors: [String]
	) {
		saveBook(
			bookId: $bookId
			title: $title
			description: $description
			image: $image
			link: $link
			authors: $authors
		) {
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

export const REMOVE_BOOK = gql`
	mutation SaveBook($bookId: ID!) {
		removeBook(bookId: $bookId) {
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