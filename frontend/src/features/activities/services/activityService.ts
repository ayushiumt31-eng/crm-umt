import type { Activity } from "../types/activity";
import { dummyActivities } from "../data/dummy-activities";

class ActivityService {
  private activities: Activity[] = [...dummyActivities];

  async getActivities(): Promise<Activity[]> {
    return [...this.activities];
  }

  async getActivityById(id: string): Promise<Activity | null> {
    const activity = this.activities.find((a) => a.id === id);
    return activity || null;
  }

  async createActivity(data: Partial<Activity>): Promise<Activity> {
    const newActivity: Activity = {
      ...data,
      id: `act-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    } as Activity;
    this.activities.push(newActivity);
    return newActivity;
  }

  async updateActivity(id: string, data: Partial<Activity>): Promise<Activity> {
    const index = this.activities.findIndex((a) => a.id === id);
    if (index === -1) throw new Error("Activity not found");

    this.activities[index] = {
      ...this.activities[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return this.activities[index];
  }

  async deleteActivity(id: string): Promise<void> {
    const index = this.activities.findIndex((a) => a.id === id);
    if (index !== -1) {
      this.activities.splice(index, 1);
    }
  }
}

export const activityService = new ActivityService();

