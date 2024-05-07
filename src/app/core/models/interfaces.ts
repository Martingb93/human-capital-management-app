export interface SearchResult<T> {
    result: T[];
    totalCount: number;
}

export interface GenericTableColumn {
    key?: string;
    keyword?: string;
    width?: number;
    classes?: string;
    filterable?: boolean;
    [key: string]: any;
}

export interface PaginatedResult<T> {
    selected?: any;
    items: T[];
    loading?: boolean;
    itemsMapType?: { [id: number]: string }
    columns: GenericTableColumn[];
    totalRecords?: number;
}

export interface NormalLayoutResult<T> {
    data: T;
    loading?: boolean;
}

export interface SearchParameters {
    startIndex: number;
    pageSize: number;
    orderColumn: string;
    isOrderAscending: boolean;
    originalSearchText?: string;
    keywords?: string[];
}

export interface SearchParametersById {
    [id: string]: SearchParameters;
}
