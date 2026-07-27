import type { SocialPost } from "../types/socialPost";
import { dummySocialPosts } from "../data/dummy-social-posts";

class SocialPostService {
  private posts: SocialPost[] = [...dummySocialPosts];

  async getSocialPosts(): Promise<SocialPost[]> {
    return [...this.posts];
  }

  async getSocialPostById(id: string): Promise<SocialPost | null> {
    const post = this.posts.find((p) => p.id === id);
    return post || null;
  }

  async createSocialPost(data: Partial<SocialPost>): Promise<SocialPost> {
    const newPost: SocialPost = {
      ...data,
      id: `sp-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    } as SocialPost;
    this.posts.push(newPost);
    return newPost;
  }

  async updateSocialPost(
    id: string,
    data: Partial<SocialPost>
  ): Promise<SocialPost> {
    const index = this.posts.findIndex((p) => p.id === id);
    if (index === -1) throw new Error("Social post not found");

    this.posts[index] = {
      ...this.posts[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return this.posts[index];
  }

  async deleteSocialPost(id: string): Promise<void> {
    const index = this.posts.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.posts.splice(index, 1);
    }
  }
}

export const socialPostService = new SocialPostService();

