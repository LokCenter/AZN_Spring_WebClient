package com.lokcenter.AZN.helper.ds;

import java.util.Arrays;
import java.util.List;

/**
 * Fast Search Algorithm
 *
 * @version 1.0 2022-11-09
 */
public class Search {
    /**
     * Find value
     *
     * @param array List of comparable type
     * @param value search value
     * @param lo lowest value
     * @param hi highest value
     * @return value or -1 of not found
     */
    private static <T extends Comparable<T>> int binarySearch(List<T> array, T value, int lo, int hi) {
        if (lo < hi) {
            int mid = (lo / 2) + (hi / 2);
            int cmp = array.get(mid).compareTo(value);
            if (cmp < 0) return binarySearch(array, value, lo, mid - 1);
            if (cmp > 0) return binarySearch(array, value, mid + 1, hi);
            return mid;
        } // if
        return -1;
    }

    /**
     * Easy to use wrapper for List<T> binary search
     */
    public static <T extends Comparable<T>> int binarySearch(List<T> array, T value) {
        return Search.binarySearch(array, value, 0, array.size());
    }

    /**
     * Get Index of element in Array
     */
    public static <T> int indexOf(T[] arr, T val) {
        return Arrays.asList(arr).indexOf(val);
    }

}
