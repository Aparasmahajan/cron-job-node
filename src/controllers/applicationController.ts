import { Request, Response } from 'express';
import { ApplicationDataService } from '../services/applicationDataService';

const applicationDataService = new ApplicationDataService();

export const getAllApplications = async (req: Request, res: Response) => {
  const applications = await applicationDataService.getAllApplications();
  res.json(applications);
};

export const getApplicationById = async (req: Request, res: Response) => {
  const application = await applicationDataService.getApplicationById(req.params.id);
  if (application) {
    res.json(application);
  } else {
    res.status(404).json({ message: 'Application not found' });
  }
};

export const createApplication = async (req: Request, res: Response) => {
  const application = await applicationDataService.createApplication(req.body);
  res.status(201).json(application);
};

export const updateApplication = async (req: Request, res: Response) => {
  const updatedApplication = await applicationDataService.updateApplication(req.params.id, req.body);
  if (updatedApplication) {
    res.json(updatedApplication);
  } else {
    res.status(404).json({ message: 'Application not found' });
  }
};

export const deleteApplication = async (req: Request, res: Response) => {
  const deleted = await applicationDataService.deleteApplication(req.params.id);
  if (deleted) {
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Application not found' });
  }
};