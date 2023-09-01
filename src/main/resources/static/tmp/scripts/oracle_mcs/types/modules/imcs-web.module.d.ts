/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import { IMCSModule } from './imcs.module';
import { IBackend } from './mobile-backend/ibackend';
export interface IMCSWebModule extends IMCSModule {
    /**
     * Authentication types enum.
     * @enum {string}
     */
    AUTHENTICATION_TYPES?: {
        basic: string;
        oauth: string;
    };
    /**
     * Represents a mobile backend in Oracle Mobile Cloud Enterprise and
     * provides access to all capabilities of the backend.
     * @type {Backend}
     */
    mobileBackend?: IBackend;
}
