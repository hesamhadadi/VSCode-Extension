/**

    Return a value.
    @param key A string.
    @return The stored value or undefined.
    */
    get<T>(key: string): T | undefined;

/**

    Return a value.
    @param key A string.
    @param defaultValue A value that should be returned when there is no
    value (undefined) with the given key.
    @return The stored value or the defaultValue.
    */
    get<T>(key: string, defaultValue: T): T;

/**
