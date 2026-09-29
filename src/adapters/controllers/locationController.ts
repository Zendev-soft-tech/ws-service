import type { Request, Response } from "express";
import { LocationRepository } from "@/src/adapters/repositories/locationRepository.js";
import { AddLocation } from "@/src/application/usecases/location/AddLocation.js";
import { GetLocations } from "@/src/application/usecases/location/GetLocations.js";
import { GetLocationById } from "@/src/application/usecases/location/GetLocationById.js";
import { GetLocationByCode } from "@/src/application/usecases/location/GetLocationByCode.js";
import { GetLocationByName } from "@/src/application/usecases/location/GetLocationByName.js";
import { GetLocationsByCity } from "@/src/application/usecases/location/GetLocationsByCity.js";
import { UpdateLocation } from "@/src/application/usecases/location/UpdateLocation.js";
import { DeleteLocation } from "@/src/application/usecases/location/DeleteLocation.js";

const repository = new LocationRepository();
const add = new AddLocation(repository);
const get = new GetLocations(repository);
const getLocationById = new GetLocationById(repository);
const getLocationByCode = new GetLocationByCode(repository);
const getLocationByName = new GetLocationByName(repository);
const getLocationsByCity = new GetLocationsByCity(repository);
const update = new UpdateLocation(repository);
const remove = new DeleteLocation(repository);

export const create = async (req: Request, res: Response) => {
    try {
        const result = await add.execute(req.body);
        res.status(201).json(result);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getAll = async (req: Request, res: Response) => {
    try {
        const result = await get.execute();
        res.json(result);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id || Array.isArray(id)) {
            return res.status(400).json({ message: "Invalid location ID" });
        }

        const result = await getLocationById.execute(id);

        if (!result) {
            return res.status(404).json({ message: "Location not found" });
        }

        res.json(result);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getByCode = async (req: Request, res: Response) => {
    try {
        const { code } = req.params;

        if (!code || Array.isArray(code)) {
            return res.status(400).json({ message: "Invalid location code" });
        }

        const result = await getLocationByCode.execute(code);

        if (!result) {
            return res.status(404).json({ message: "Location not found" });
        }

        res.json(result);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getByName = async (req: Request, res: Response) => {
    try {
        const { name } = req.params;

        if (!name || Array.isArray(name)) {
            return res.status(400).json({ message: "Invalid location name" });
        }

        const result = await getLocationByName.execute(name);

        if (!result) {
            return res.status(404).json({ message: "Location not found" });
        }

        res.json(result);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getByCity = async (req: Request, res: Response) => {
    try {
        const { city } = req.params;

        if (!city || Array.isArray(city)) {
            return res.status(400).json({ message: "Invalid city" });
        }

        const result = await getLocationsByCity.execute(city);
        res.json(result);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const updateLocation = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id || Array.isArray(id)) {
            return res.status(400).json({ message: "Invalid location ID" });
        }

        const result = await update.execute(id, req.body);
        res.json(result);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const removeLocation = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id || Array.isArray(id)) {
            return res.status(400).json({ message: "Invalid location ID" });
        }

        const result = await remove.execute(id);
        res.json(result);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};