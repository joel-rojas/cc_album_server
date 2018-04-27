import express from 'express';
import photoRouter from './photo';

/**
 * This function sets Photo API generic route
 * @param {Express} app - Express object 
 */
export default function routes (app) {
    app.use('/api/photos', photoRouter);
}