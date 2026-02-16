import * as React from 'react';
import {
    useGetResourceLabel,
    useResourceContext,
    useResourceTranslation,
} from 'ra-core';
import * as Alert from '../ui/alert';

export const Offline = (props: OfflineProps) => {
    const {
        message: messageProp,
        className,
        ...rest
    } = props;
    const resource = useResourceContext(props);
    const getResourceLabel = useGetResourceLabel();

    const message = useResourceTranslation({
        baseI18nKey: 'ra.notification.offline',
        resourceI18nKey: resource
            ? `resources.${resource}.notification.offline`
            : undefined,
        userText: messageProp,
        options: {
            name: resource ? getResourceLabel(resource, 0) : undefined,
            _: 'No connectivity. Could not fetch data.',
        },
    });

    return (
        <Alert.Alert
            className={className}
            {...rest}
        >
            <h1>{message}</h1>
        </Alert.Alert>
    );
};

export interface OfflineProps {
    resource?: string;
    message?: string;
    className?: string;
}
