import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import {
    useInfinitePaginationContext,
    useListContext,
    useEvent,
} from 'ra-core';
import { ProgressAuto } from '../ui/progress';
import { Offline } from './offline';

/**
 * A pagination component that loads more results when the user scrolls to the
 * bottom of the list.
 *
 * Used as the default pagination component in the <InfiniteList> component.
 *
 * @example
 * import {
 *      InfiniteList,
 *      InfinitePagination,
 * } from 'ra-core';
 * import { TextField, DataTable } from "@/components/admin";
 *
 * const PostList = () => (
 *    <InfiniteList pagination={<InfinitePagination />}>
 *       <DataTable>
 *         <DataTable.Col source="id" />
 *         <DataTable.Col source="title" />
 *      </DataTable>
 *   </InfiniteList>
 * );
 */
export const InfinitePagination = ({
    offline = defaultOffline,
    options = defaultOptions,
    className
}: InfinitePaginationProps) => {
    const { isPaused, isPending } = useListContext();
    const {
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useInfinitePaginationContext();

    if (!fetchNextPage) {
        throw new Error(
            'InfinitePagination must be used inside an InfinitePaginationContext, usually created by <InfiniteList>. You cannot use it as child of a <List> component.'
        );
    }

    const [hasRequestedNextPage, setHasRequestedNextPage] = useState(false);
    const observerElem = useRef(null);
    const handleObserver = useEvent<[IntersectionObserverEntry[]], void>(
        entries => {
            const [target] = entries;
            if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
                setHasRequestedNextPage(true);
                fetchNextPage();
            }
        }
    );

    useEffect(() => {
        // Whenever the query is unpaused, reset the requested next page state
        if (!isPaused) {
            setHasRequestedNextPage(false);
        }
    }, [isPaused]);

    useEffect(() => {
        const element = observerElem.current;
        if (!element) return;
        const observer = new IntersectionObserver(handleObserver, options);
        observer.observe(element);
        return () => observer.unobserve(element);
    }, [
        fetchNextPage,
        hasNextPage,
        handleObserver,
        options,
        isPending,
        isFetchingNextPage,
    ]);

    if (isPending) return null;

    const showOffline =
        isPaused &&
        hasNextPage &&
        hasRequestedNextPage &&
        offline !== false &&
        offline !== undefined;

    return (
        <div
            ref={observerElem}
            className={`py-2 text-center ${className}`}
        >
            {showOffline ? (
                offline
            ) : isFetchingNextPage && hasNextPage ? (
                <ProgressAuto />
            ) : null}
        </div>
    );
};

const defaultOptions = { threshold: 0 };
const defaultOffline = <Offline />;

export interface InfinitePaginationProps {
    offline?: React.ReactNode;
    options?: IntersectionObserverInit;
    className?: string;
}
