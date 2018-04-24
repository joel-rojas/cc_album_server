import express from 'express';
import photoRouter from './photo';

export default function routes (app) {
    app.use('/api/photos', photoRouter);
}