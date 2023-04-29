import gql from "graphql-tag";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Book = {
  __typename?: "Book";
  annotation?: Maybe<Scalars["String"]>;
  author?: Maybe<Scalars["String"]>;
  book_status: EBookStatus;
  book_versions?: Maybe<Array<BookVersion>>;
  cover?: Maybe<Scalars["String"]>;
  created_at: Scalars["DateTime"];
  id: Scalars["ID"];
  is_private: Scalars["Boolean"];
  sections?: Maybe<Array<Section>>;
  title: Scalars["String"];
  updated_at: Scalars["DateTime"];
};

export type BookBook_VersionsArgs = {
  ORDER?: InputMaybe<BookVersion_OrderInputType>;
  WHERE?: InputMaybe<BookVersion_FilterInputType>;
};

export type BookSectionsArgs = {
  ORDER?: InputMaybe<Section_OrderInputType>;
  WHERE?: InputMaybe<Section_FilterInputType>;
};

export type BookChangePrivate = {
  __typename?: "BookChangePrivate";
  id: Scalars["ID"];
  is_private: Scalars["Boolean"];
};

export type BookChangeStatus = {
  __typename?: "BookChangeStatus";
  book_status: EBookStatus;
  id: Scalars["ID"];
};

export type BookDelete = {
  __typename?: "BookDelete";
  id: Scalars["ID"];
};

export type BookVersion = {
  __typename?: "BookVersion";
  annotation?: Maybe<Scalars["String"]>;
  book_id: Scalars["ID"];
  created_at: Scalars["DateTime"];
  id: Scalars["ID"];
  is_main: Scalars["Boolean"];
  title: Scalars["String"];
  updated_at: Scalars["DateTime"];
  user: User;
  user_id: Scalars["ID"];
};

export type BookVersion_FilterInputType = {
  AND?: InputMaybe<Array<BookVersion_FilterInputType>>;
  OR?: InputMaybe<Array<BookVersion_FilterInputType>>;
  book_id?: InputMaybe<Id_FilterInputType>;
  id?: InputMaybe<Id_FilterInputType>;
  is_main?: InputMaybe<Boolean_FilterInputType>;
  title?: InputMaybe<String_FilterInputType>;
  user_id?: InputMaybe<Id_FilterInputType>;
};

export type BookVersion_OrderInputType = {
  book_id?: InputMaybe<Field_OrderInputType>;
  created_at?: InputMaybe<Field_OrderInputType>;
  id?: InputMaybe<Field_OrderInputType>;
  title?: InputMaybe<Field_OrderInputType>;
  updated_at?: InputMaybe<Field_OrderInputType>;
  user_id?: InputMaybe<Field_OrderInputType>;
};

export type Book_FilterInputType = {
  AND?: InputMaybe<Array<Book_FilterInputType>>;
  OR?: InputMaybe<Array<Book_FilterInputType>>;
  book_status?: InputMaybe<EBookStatus_FilterInputType>;
  id?: InputMaybe<Id_FilterInputType>;
  is_private?: InputMaybe<Boolean_FilterInputType>;
  title?: InputMaybe<String_FilterInputType>;
};

export type Book_OrderInputType = {
  created_at?: InputMaybe<Field_OrderInputType>;
  id?: InputMaybe<Field_OrderInputType>;
  title?: InputMaybe<Field_OrderInputType>;
  updated_at?: InputMaybe<Field_OrderInputType>;
};

export type Bookmark = {
  __typename?: "Bookmark";
  book: Book;
  book_id: Scalars["ID"];
  bookmark_status: EBookmarkStatus;
  created_at: Scalars["DateTime"];
  id: Scalars["ID"];
  updated_at: Scalars["DateTime"];
  user: User;
  user_id: Scalars["ID"];
};

export type Bookmark_FilterInputType = {
  AND?: InputMaybe<Array<Bookmark_FilterInputType>>;
  OR?: InputMaybe<Array<Bookmark_FilterInputType>>;
  book_id?: InputMaybe<Id_FilterInputType>;
  user_id?: InputMaybe<Id_FilterInputType>;
};

export type Bookmark_OrderInputType = {
  book_id?: InputMaybe<Field_OrderInputType>;
  created_at?: InputMaybe<Field_OrderInputType>;
  updated_at?: InputMaybe<Field_OrderInputType>;
  user_id?: InputMaybe<Field_OrderInputType>;
};

export type Boolean_FilterInputType = {
  EQ?: InputMaybe<Scalars["Boolean"]>;
  IN?: InputMaybe<Array<Scalars["Boolean"]>>;
  NOT_EQ?: InputMaybe<Scalars["Boolean"]>;
  NOT_IN?: InputMaybe<Array<Scalars["Boolean"]>>;
  NULL?: InputMaybe<Scalars["Boolean"]>;
};

export type CreateItemTextVersionDto = {
  is_main: Scalars["Boolean"];
  item_text_id: Scalars["ID"];
  user_id: Scalars["ID"];
  value: Scalars["String"];
};

export enum EBookStatus {
  InProcess = "IN_PROCESS",
  Queue = "QUEUE",
  Ready = "READY",
  Suspended = "SUSPENDED",
  Thrown = "THROWN",
}

export type EBookStatus_FilterInputType = {
  EQ?: InputMaybe<EBookStatus>;
  IN?: InputMaybe<Array<EBookStatus>>;
  NOT_EQ?: InputMaybe<EBookStatus>;
  NOT_IN?: InputMaybe<Array<EBookStatus>>;
  NULL?: InputMaybe<Scalars["Boolean"]>;
};

export enum EBookmarkStatus {
  Completed = "COMPLETED",
  Dropped = "DROPPED",
  OnHold = "ON_HOLD",
  Planned = "PLANNED",
  Watching = "WATCHING",
}

export enum EOrderMethod {
  Asc = "ASC",
  Desc = "DESC",
}

export enum EOrderNulls {
  First = "FIRST",
  Last = "LAST",
}

export enum ESectionStatus {
  InProcess = "IN_PROCESS",
  Queue = "QUEUE",
  Ready = "READY",
}

export type Id_FilterInputType = {
  EQ?: InputMaybe<Scalars["ID"]>;
  IN?: InputMaybe<Array<Scalars["ID"]>>;
  NOT_EQ?: InputMaybe<Scalars["ID"]>;
  NOT_IN?: InputMaybe<Array<Scalars["ID"]>>;
  NULL?: InputMaybe<Scalars["Boolean"]>;
};

export type Int_FilterInputType = {
  EQ?: InputMaybe<Scalars["Int"]>;
  GT?: InputMaybe<Scalars["Int"]>;
  GTE?: InputMaybe<Scalars["Int"]>;
  IN?: InputMaybe<Array<Scalars["Int"]>>;
  LT?: InputMaybe<Scalars["Int"]>;
  LTE?: InputMaybe<Scalars["Int"]>;
  NOT_EQ?: InputMaybe<Scalars["Int"]>;
  NOT_IN?: InputMaybe<Array<Scalars["Int"]>>;
  NULL?: InputMaybe<Scalars["Boolean"]>;
};

export type Item = {
  __typename?: "Item";
  created_at: Scalars["DateTime"];
  id: Scalars["ID"];
  itemable: ItemableType;
  itemable_id: Scalars["ID"];
  itemable_type: Scalars["String"];
  position: Scalars["Int"];
  section_id: Scalars["ID"];
  updated_at: Scalars["DateTime"];
};

export type ItemImage = {
  __typename?: "ItemImage";
  created_at: Scalars["DateTime"];
  id: Scalars["ID"];
  updated_at: Scalars["DateTime"];
  value: Scalars["String"];
};

export type ItemText = {
  __typename?: "ItemText";
  created_at: Scalars["DateTime"];
  id: Scalars["ID"];
  item_text_versions?: Maybe<Array<ItemTextVersion>>;
  updated_at: Scalars["DateTime"];
  value: Scalars["String"];
};

export type ItemTextItem_Text_VersionsArgs = {
  ORDER?: InputMaybe<ItemTextVersion_OrderInputType>;
  WHERE?: InputMaybe<ItemTextVersion_FilterInputType>;
};

export type ItemTextVersion = {
  __typename?: "ItemTextVersion";
  created_at: Scalars["DateTime"];
  id: Scalars["ID"];
  is_main: Scalars["Boolean"];
  item_text_id: Scalars["ID"];
  updated_at: Scalars["DateTime"];
  user: User;
  user_id: Scalars["ID"];
  value: Scalars["String"];
};

export type ItemTextVersion_FilterInputType = {
  AND?: InputMaybe<Array<ItemTextVersion_FilterInputType>>;
  OR?: InputMaybe<Array<ItemTextVersion_FilterInputType>>;
  id?: InputMaybe<Id_FilterInputType>;
  is_main?: InputMaybe<Boolean_FilterInputType>;
  item_text_id?: InputMaybe<Id_FilterInputType>;
  user_id?: InputMaybe<Id_FilterInputType>;
};

export type ItemTextVersion_OrderInputType = {
  created_at?: InputMaybe<Field_OrderInputType>;
  id?: InputMaybe<Field_OrderInputType>;
  item_text_id?: InputMaybe<Field_OrderInputType>;
  updated_at?: InputMaybe<Field_OrderInputType>;
  user_id?: InputMaybe<Field_OrderInputType>;
};

export type ItemText_FilterInputType = {
  AND?: InputMaybe<Array<ItemText_FilterInputType>>;
  OR?: InputMaybe<Array<ItemText_FilterInputType>>;
  id?: InputMaybe<Id_FilterInputType>;
};

export type ItemText_OrderInputType = {
  created_at?: InputMaybe<Field_OrderInputType>;
  id?: InputMaybe<Field_OrderInputType>;
  updated_at?: InputMaybe<Field_OrderInputType>;
};

export type Item_FilterInputType = {
  AND?: InputMaybe<Array<Item_FilterInputType>>;
  OR?: InputMaybe<Array<Item_FilterInputType>>;
  id?: InputMaybe<Id_FilterInputType>;
  itemable_id?: InputMaybe<Id_FilterInputType>;
  itemable_type?: InputMaybe<String_FilterInputType>;
  position?: InputMaybe<Int_FilterInputType>;
  section_id?: InputMaybe<Id_FilterInputType>;
};

export type Item_OrderInputType = {
  created_at?: InputMaybe<Field_OrderInputType>;
  id?: InputMaybe<Field_OrderInputType>;
  itemable_id?: InputMaybe<Field_OrderInputType>;
  itemable_type?: InputMaybe<Field_OrderInputType>;
  position?: InputMaybe<Field_OrderInputType>;
  section_id?: InputMaybe<Field_OrderInputType>;
  updated_at?: InputMaybe<Field_OrderInputType>;
};

export type ItemableType = ItemImage | ItemText;

export type Mutation = {
  __typename?: "Mutation";
  bookChangePrivate: BookChangePrivate;
  bookChangeStatus: BookChangeStatus;
  bookDelete: BookDelete;
  sectionChangeStatus: SectionChangeStatus;
  textVersionCreate: ItemTextVersion;
  textVersionDelete: ItemTextVersion;
  textVersionUpdate: ItemTextVersion;
};

export type MutationBookChangePrivateArgs = {
  id: Scalars["ID"];
  is_private: Scalars["Boolean"];
};

export type MutationBookChangeStatusArgs = {
  book_status: EBookStatus;
  id: Scalars["ID"];
};

export type MutationBookDeleteArgs = {
  id: Scalars["ID"];
};

export type MutationSectionChangeStatusArgs = {
  id: Scalars["ID"];
  section_status: ESectionStatus;
};

export type MutationTextVersionCreateArgs = {
  data: CreateItemTextVersionDto;
};

export type MutationTextVersionDeleteArgs = {
  id: Scalars["ID"];
};

export type MutationTextVersionUpdateArgs = {
  data: UpdateItemTextVersionDto;
  id: Scalars["ID"];
};

export type PaginationInputType = {
  page: Scalars["Int"];
  per_page: Scalars["Int"];
};

export type Query = {
  __typename?: "Query";
  book_versions: Array<BookVersion>;
  bookmarks: Array<Bookmark>;
  books: Array<Book>;
  item_text_versions: Array<ItemTextVersion>;
  item_texts: Array<ItemText>;
  items: Array<Item>;
  section_versions: Array<SectionVersion>;
  sections: Array<Section>;
  translators: Array<Translator>;
  users: Array<User>;
};

export type QueryBook_VersionsArgs = {
  ORDER?: InputMaybe<BookVersion_OrderInputType>;
  PAGINATION?: InputMaybe<PaginationInputType>;
  WHERE?: InputMaybe<BookVersion_FilterInputType>;
};

export type QueryBookmarksArgs = {
  ORDER?: InputMaybe<Bookmark_OrderInputType>;
  PAGINATION?: InputMaybe<PaginationInputType>;
  WHERE?: InputMaybe<Bookmark_FilterInputType>;
};

export type QueryBooksArgs = {
  ORDER?: InputMaybe<Book_OrderInputType>;
  PAGINATION?: InputMaybe<PaginationInputType>;
  WHERE?: InputMaybe<Book_FilterInputType>;
};

export type QueryItem_Text_VersionsArgs = {
  ORDER?: InputMaybe<ItemTextVersion_OrderInputType>;
  PAGINATION?: InputMaybe<PaginationInputType>;
  WHERE?: InputMaybe<ItemTextVersion_FilterInputType>;
};

export type QueryItem_TextsArgs = {
  ORDER?: InputMaybe<ItemText_OrderInputType>;
  PAGINATION?: InputMaybe<PaginationInputType>;
  WHERE?: InputMaybe<ItemText_FilterInputType>;
};

export type QueryItemsArgs = {
  ORDER?: InputMaybe<Item_OrderInputType>;
  PAGINATION?: InputMaybe<PaginationInputType>;
  WHERE?: InputMaybe<Item_FilterInputType>;
};

export type QuerySection_VersionsArgs = {
  ORDER?: InputMaybe<SectionVersion_OrderInputType>;
  PAGINATION?: InputMaybe<PaginationInputType>;
  WHERE?: InputMaybe<SectionVersion_FilterInputType>;
};

export type QuerySectionsArgs = {
  ORDER?: InputMaybe<Section_OrderInputType>;
  PAGINATION?: InputMaybe<PaginationInputType>;
  WHERE?: InputMaybe<Section_FilterInputType>;
};

export type QueryTranslatorsArgs = {
  ORDER?: InputMaybe<Translator_OrderInputType>;
  PAGINATION?: InputMaybe<PaginationInputType>;
  WHERE?: InputMaybe<Translator_FilterInputType>;
};

export type QueryUsersArgs = {
  ORDER?: InputMaybe<User_OrderInputType>;
  PAGINATION?: InputMaybe<PaginationInputType>;
  WHERE?: InputMaybe<User_FilterInputType>;
};

export type Section = {
  __typename?: "Section";
  book_id: Scalars["ID"];
  created_at: Scalars["DateTime"];
  epigraph?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  items?: Maybe<Array<Item>>;
  position: Scalars["Int"];
  section_status: ESectionStatus;
  section_versions?: Maybe<Array<SectionVersion>>;
  title: Scalars["String"];
  updated_at: Scalars["DateTime"];
};

export type SectionItemsArgs = {
  ORDER?: InputMaybe<Item_OrderInputType>;
  WHERE?: InputMaybe<Item_FilterInputType>;
};

export type SectionSection_VersionsArgs = {
  ORDER?: InputMaybe<SectionVersion_OrderInputType>;
  WHERE?: InputMaybe<SectionVersion_FilterInputType>;
};

export type SectionChangeStatus = {
  __typename?: "SectionChangeStatus";
  id: Scalars["ID"];
  section_status: ESectionStatus;
};

export type SectionVersion = {
  __typename?: "SectionVersion";
  created_at: Scalars["DateTime"];
  epigraph?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  is_main: Scalars["Boolean"];
  section_id: Scalars["ID"];
  title: Scalars["String"];
  updated_at: Scalars["DateTime"];
  user: User;
  user_id: Scalars["ID"];
};

export type SectionVersion_FilterInputType = {
  AND?: InputMaybe<Array<SectionVersion_FilterInputType>>;
  OR?: InputMaybe<Array<SectionVersion_FilterInputType>>;
  id?: InputMaybe<Id_FilterInputType>;
  is_main?: InputMaybe<Boolean_FilterInputType>;
  section_id?: InputMaybe<Id_FilterInputType>;
  title?: InputMaybe<String_FilterInputType>;
  user_id?: InputMaybe<Id_FilterInputType>;
};

export type SectionVersion_OrderInputType = {
  created_at?: InputMaybe<Field_OrderInputType>;
  id?: InputMaybe<Field_OrderInputType>;
  section_id?: InputMaybe<Field_OrderInputType>;
  title?: InputMaybe<Field_OrderInputType>;
  updated_at?: InputMaybe<Field_OrderInputType>;
  user_id?: InputMaybe<Field_OrderInputType>;
};

export type Section_FilterInputType = {
  AND?: InputMaybe<Array<Section_FilterInputType>>;
  OR?: InputMaybe<Array<Section_FilterInputType>>;
  book_id?: InputMaybe<Id_FilterInputType>;
  id?: InputMaybe<Id_FilterInputType>;
  position?: InputMaybe<Int_FilterInputType>;
  title?: InputMaybe<String_FilterInputType>;
};

export type Section_OrderInputType = {
  book_id?: InputMaybe<Field_OrderInputType>;
  created_at?: InputMaybe<Field_OrderInputType>;
  id?: InputMaybe<Field_OrderInputType>;
  position?: InputMaybe<Field_OrderInputType>;
  title?: InputMaybe<Field_OrderInputType>;
  updated_at?: InputMaybe<Field_OrderInputType>;
};

export type String_FilterInputType = {
  EQ?: InputMaybe<Scalars["String"]>;
  ILIKE?: InputMaybe<Scalars["String"]>;
  IN?: InputMaybe<Array<Scalars["String"]>>;
  NOT_EQ?: InputMaybe<Scalars["String"]>;
  NOT_ILIKE?: InputMaybe<Scalars["String"]>;
  NOT_IN?: InputMaybe<Array<Scalars["String"]>>;
  NULL?: InputMaybe<Scalars["Boolean"]>;
};

export type Translator = {
  __typename?: "Translator";
  book: Book;
  book_id: Scalars["ID"];
  created_at: Scalars["DateTime"];
  id: Scalars["ID"];
  updated_at: Scalars["DateTime"];
  user: User;
  user_id: Scalars["ID"];
};

export type Translator_FilterInputType = {
  AND?: InputMaybe<Array<Translator_FilterInputType>>;
  OR?: InputMaybe<Array<Translator_FilterInputType>>;
  book_id?: InputMaybe<Id_FilterInputType>;
  id?: InputMaybe<Id_FilterInputType>;
  user_id?: InputMaybe<Id_FilterInputType>;
};

export type Translator_OrderInputType = {
  book_id?: InputMaybe<Field_OrderInputType>;
  created_at?: InputMaybe<Field_OrderInputType>;
  id?: InputMaybe<Field_OrderInputType>;
  updated_at?: InputMaybe<Field_OrderInputType>;
  user_id?: InputMaybe<Field_OrderInputType>;
};

export type UpdateItemTextVersionDto = {
  is_main: Scalars["Boolean"];
  value: Scalars["String"];
};

export type User = {
  __typename?: "User";
  created_at: Scalars["DateTime"];
  id: Scalars["ID"];
  is_admin: Scalars["Boolean"];
  is_blocked: Scalars["Boolean"];
  is_online: Scalars["Boolean"];
  login: Scalars["String"];
  nickname?: Maybe<Scalars["String"]>;
  translators?: Maybe<Array<Translator>>;
  updated_at: Scalars["DateTime"];
};

export type User_FilterInputType = {
  AND?: InputMaybe<Array<User_FilterInputType>>;
  OR?: InputMaybe<Array<User_FilterInputType>>;
  id?: InputMaybe<Id_FilterInputType>;
  is_admin?: InputMaybe<Boolean_FilterInputType>;
  is_blocked?: InputMaybe<Boolean_FilterInputType>;
  is_online?: InputMaybe<Boolean_FilterInputType>;
  login?: InputMaybe<String_FilterInputType>;
  nickname?: InputMaybe<String_FilterInputType>;
};

export type User_OrderInputType = {
  created_at?: InputMaybe<Field_OrderInputType>;
  id?: InputMaybe<Field_OrderInputType>;
  is_admin?: InputMaybe<Field_OrderInputType>;
  is_blocked?: InputMaybe<Field_OrderInputType>;
  is_online?: InputMaybe<Field_OrderInputType>;
  login?: InputMaybe<Field_OrderInputType>;
  nickname?: InputMaybe<Field_OrderInputType>;
  updated_at?: InputMaybe<Field_OrderInputType>;
};

export type Field_OrderInputType = {
  NULLS?: InputMaybe<EOrderNulls>;
  SORT: EOrderMethod;
};

export type BookQueryVariables = Exact<{
  book_id: Scalars["ID"];
}>;

export type BookQuery = {
  __typename?: "Query";
  books: Array<{
    __typename?: "Book";
    id: string;
    title: string;
    annotation?: string | null;
    book_status: EBookStatus;
    cover?: string | null;
    book_versions?: Array<{
      __typename?: "BookVersion";
      id: string;
      title: string;
      annotation?: string | null;
    }> | null;
  }>;
};

export type BookChangePrivateMutationVariables = Exact<{
  book_id: Scalars["ID"];
  is_private: Scalars["Boolean"];
}>;

export type BookChangePrivateMutation = {
  __typename?: "Mutation";
  bookChangePrivate: { __typename?: "BookChangePrivate"; id: string };
};

export type BookChangeStatusMutationVariables = Exact<{
  book_id: Scalars["ID"];
  book_status: EBookStatus;
}>;

export type BookChangeStatusMutation = {
  __typename?: "Mutation";
  bookChangeStatus: { __typename?: "BookChangeStatus"; id: string };
};

export type BookDeleteMutationVariables = Exact<{
  book_id: Scalars["ID"];
}>;

export type BookDeleteMutation = {
  __typename?: "Mutation";
  bookDelete: { __typename?: "BookDelete"; id: string };
};

export type BookSectionsQueryVariables = Exact<{
  book_id: Scalars["ID"];
  user_id: Scalars["ID"];
}>;

export type BookSectionsQuery = {
  __typename?: "Query";
  books: Array<{
    __typename?: "Book";
    id: string;
    title: string;
    author?: string | null;
    is_private: boolean;
    book_status: EBookStatus;
    sections?: Array<{
      __typename?: "Section";
      id: string;
      position: number;
      title: string;
      created_at: any;
      section_status: ESectionStatus;
    }> | null;
  }>;
  translators: Array<{ __typename?: "Translator"; id: string }>;
};

export type UserTranslationsQueryVariables = Exact<{
  user_id: Scalars["ID"];
}>;

export type UserTranslationsQuery = {
  __typename?: "Query";
  translators: Array<{
    __typename?: "Translator";
    id: string;
    book_id: string;
    book: {
      __typename?: "Book";
      id: string;
      title: string;
      author?: string | null;
      cover?: string | null;
      created_at: any;
      book_status: EBookStatus;
      is_private: boolean;
      book_versions?: Array<{
        __typename?: "BookVersion";
        id: string;
        title: string;
      }> | null;
    };
  }>;
};

export type ItemTextQueryVariables = Exact<{
  book_id: Scalars["ID"];
  section_id: Scalars["ID"];
  item_id: Scalars["ID"];
  user_id?: InputMaybe<Scalars["ID"]>;
}>;

export type ItemTextQuery = {
  __typename?: "Query";
  books: Array<{
    __typename?: "Book";
    id: string;
    title: string;
    author?: string | null;
    sections?: Array<{
      __typename?: "Section";
      id: string;
      position: number;
      title: string;
      created_at: any;
      items?: Array<{
        __typename?: "Item";
        id: string;
        itemable:
          | { __typename: "ItemImage"; id: string; value: string }
          | { __typename: "ItemText"; id: string; value: string };
      }> | null;
    }> | null;
  }>;
  translators: Array<{ __typename?: "Translator"; id: string }>;
};

export type ItemTextVersionQueryVariables = Exact<{
  book_id: Scalars["ID"];
  section_id: Scalars["ID"];
  item_id: Scalars["ID"];
  item_version_id: Scalars["ID"];
  user_id?: InputMaybe<Scalars["ID"]>;
}>;

export type ItemTextVersionQuery = {
  __typename?: "Query";
  books: Array<{
    __typename?: "Book";
    id: string;
    title: string;
    author?: string | null;
    sections?: Array<{
      __typename?: "Section";
      id: string;
      position: number;
      title: string;
      created_at: any;
      items?: Array<{
        __typename?: "Item";
        id: string;
        itemable:
          | { __typename: "ItemImage"; id: string; value: string }
          | {
              __typename: "ItemText";
              id: string;
              value: string;
              item_text_versions?: Array<{
                __typename?: "ItemTextVersion";
                id: string;
                is_main: boolean;
                value: string;
              }> | null;
            };
      }> | null;
    }> | null;
  }>;
  translators: Array<{ __typename?: "Translator"; id: string }>;
};

export type TextVersionCreateMutationVariables = Exact<{
  data: CreateItemTextVersionDto;
}>;

export type TextVersionCreateMutation = {
  __typename?: "Mutation";
  textVersionCreate: { __typename?: "ItemTextVersion"; id: string };
};

export type TextVersionDeleteMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type TextVersionDeleteMutation = {
  __typename?: "Mutation";
  textVersionDelete: { __typename?: "ItemTextVersion"; id: string };
};

export type TextVersionUpdateMutationVariables = Exact<{
  id: Scalars["ID"];
  data: UpdateItemTextVersionDto;
}>;

export type TextVersionUpdateMutation = {
  __typename?: "Mutation";
  textVersionUpdate: { __typename?: "ItemTextVersion"; id: string };
};

export type SectionChangeStatusMutationVariables = Exact<{
  section_id: Scalars["ID"];
  section_status: ESectionStatus;
}>;

export type SectionChangeStatusMutation = {
  __typename?: "Mutation";
  sectionChangeStatus: { __typename?: "SectionChangeStatus"; id: string };
};

export type SectionItemsQueryVariables = Exact<{
  book_id: Scalars["ID"];
  section_id: Scalars["ID"];
  user_id?: InputMaybe<Scalars["ID"]>;
}>;

export type SectionItemsQuery = {
  __typename?: "Query";
  books: Array<{
    __typename?: "Book";
    id: string;
    title: string;
    author?: string | null;
    book_status: EBookStatus;
    sections?: Array<{
      __typename?: "Section";
      id: string;
      position: number;
      title: string;
      created_at: any;
      section_status: ESectionStatus;
      items?: Array<{
        __typename?: "Item";
        id: string;
        position: number;
        itemable:
          | { __typename: "ItemImage"; id: string; value: string }
          | {
              __typename: "ItemText";
              id: string;
              value: string;
              item_text_versions?: Array<{
                __typename?: "ItemTextVersion";
                id: string;
                is_main: boolean;
                created_at: any;
                user: {
                  __typename?: "User";
                  id: string;
                  login: string;
                  nickname?: string | null;
                };
              }> | null;
            };
      }> | null;
    }> | null;
  }>;
  translators: Array<{ __typename?: "Translator"; id: string }>;
};

export const Book = gql`
  query Book($book_id: ID!) {
    books(WHERE: { id: { EQ: $book_id } }) {
      id
      title
      annotation
      book_status
      cover
      book_versions(WHERE: { is_main: { EQ: true } }) {
        id
        title
        annotation
      }
    }
  }
`;
export const BookChangePrivate = gql`
  mutation BookChangePrivate($book_id: ID!, $is_private: Boolean!) {
    bookChangePrivate(id: $book_id, is_private: $is_private) {
      id
    }
  }
`;
export const BookChangeStatus = gql`
  mutation BookChangeStatus($book_id: ID!, $book_status: EBookStatus!) {
    bookChangeStatus(id: $book_id, book_status: $book_status) {
      id
    }
  }
`;
export const BookDelete = gql`
  mutation BookDelete($book_id: ID!) {
    bookDelete(id: $book_id) {
      id
    }
  }
`;
export const BookSections = gql`
  query BookSections($book_id: ID!, $user_id: ID!) {
    books(WHERE: { id: { EQ: $book_id } }) {
      id
      title
      author
      is_private
      book_status
      sections(ORDER: { position: { SORT: ASC } }) {
        id
        position
        title
        created_at
        section_status
      }
    }
    translators(
      WHERE: { book_id: { EQ: $book_id }, user_id: { EQ: $user_id } }
    ) {
      id
    }
  }
`;
export const UserTranslations = gql`
  query UserTranslations($user_id: ID!) {
    translators(
      WHERE: { user_id: { EQ: $user_id } }
      ORDER: { created_at: { SORT: DESC } }
    ) {
      id
      book_id
      book {
        id
        title
        author
        cover
        created_at
        book_status
        is_private
        book_versions(WHERE: { is_main: { EQ: true } }) {
          id
          title
        }
      }
    }
  }
`;
export const ItemText = gql`
  query ItemText($book_id: ID!, $section_id: ID!, $item_id: ID!, $user_id: ID) {
    books(WHERE: { id: { EQ: $book_id } }) {
      id
      title
      author
      sections(WHERE: { id: { EQ: $section_id } }) {
        id
        position
        title
        created_at
        items(WHERE: { id: { EQ: $item_id } }) {
          id
          itemable {
            __typename
            ... on ItemText {
              id
              value
            }
            ... on ItemImage {
              id
              value
            }
          }
        }
      }
    }
    translators(
      WHERE: { book_id: { EQ: $book_id }, user_id: { EQ: $user_id } }
    ) {
      id
    }
  }
`;
export const ItemTextVersion = gql`
  query ItemTextVersion(
    $book_id: ID!
    $section_id: ID!
    $item_id: ID!
    $item_version_id: ID!
    $user_id: ID
  ) {
    books(WHERE: { id: { EQ: $book_id } }) {
      id
      title
      author
      sections(WHERE: { id: { EQ: $section_id } }) {
        id
        position
        title
        created_at
        items(WHERE: { id: { EQ: $item_id } }) {
          id
          itemable {
            __typename
            ... on ItemText {
              id
              value
              item_text_versions(WHERE: { id: { EQ: $item_version_id } }) {
                id
                is_main
                value
              }
            }
            ... on ItemImage {
              id
              value
            }
          }
        }
      }
    }
    translators(
      WHERE: { book_id: { EQ: $book_id }, user_id: { EQ: $user_id } }
    ) {
      id
    }
  }
`;
export const TextVersionCreate = gql`
  mutation TextVersionCreate($data: CreateItemTextVersionDTO!) {
    textVersionCreate(data: $data) {
      id
    }
  }
`;
export const TextVersionDelete = gql`
  mutation TextVersionDelete($id: ID!) {
    textVersionDelete(id: $id) {
      id
    }
  }
`;
export const TextVersionUpdate = gql`
  mutation TextVersionUpdate($id: ID!, $data: UpdateItemTextVersionDTO!) {
    textVersionUpdate(id: $id, data: $data) {
      id
    }
  }
`;
export const SectionChangeStatus = gql`
  mutation SectionChangeStatus(
    $section_id: ID!
    $section_status: ESectionStatus!
  ) {
    sectionChangeStatus(id: $section_id, section_status: $section_status) {
      id
    }
  }
`;
export const SectionItems = gql`
  query SectionItems($book_id: ID!, $section_id: ID!, $user_id: ID) {
    books(WHERE: { id: { EQ: $book_id } }) {
      id
      title
      author
      book_status
      sections(WHERE: { id: { EQ: $section_id } }) {
        id
        position
        title
        created_at
        section_status
        items {
          id
          position
          itemable {
            __typename
            ... on ItemText {
              id
              value
              item_text_versions(ORDER: { created_at: { SORT: ASC } }) {
                id
                is_main
                created_at
                user {
                  id
                  login
                  nickname
                }
              }
            }
            ... on ItemImage {
              id
              value
            }
          }
        }
      }
    }
    translators(
      WHERE: { book_id: { EQ: $book_id }, user_id: { EQ: $user_id } }
    ) {
      id
    }
  }
`;
