import { getFirestore } from 'firebase-admin/firestore';

interface Migration {
  version: number;
  up: () => Promise<void>;
  down: () => Promise<void>;
}

class MigrationManager {
  private db = getFirestore();
  private readonly migrationsCollection = 'migrations';

  async getPendingMigrations(): Promise<Migration[]> {
    const appliedMigrations = await this.db
      .collection(this.migrationsCollection)
      .get();
    
    const appliedVersions = new Set(
      appliedMigrations.docs.map(doc => doc.data().version)
    );

    return this.allMigrations.filter(
      migration => !appliedVersions.has(migration.version)
    );
  }

  async recordMigration(version: number): Promise<void> {
    await this.db.collection(this.migrationsCollection).add({
      version,
      appliedAt: new Date()
    });
  }

  async migrate(): Promise<void> {
    const pendingMigrations = await this.getPendingMigrations();
    
    for (const migration of pendingMigrations) {
      try {
        await migration.up();
        await this.recordMigration(migration.version);
        console.log(`Migration ${migration.version} completed successfully`);
      } catch (error) {
        console.error(`Migration ${migration.version} failed:`, error);
        throw error;
      }
    }
  }
} 