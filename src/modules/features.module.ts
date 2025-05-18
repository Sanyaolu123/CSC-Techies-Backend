import { Module } from '@nestjs/common';
import { CoursesModule } from './courses/courses.module';
import { TimetableModule } from './timetable/timetable.module';
import { EventsModule } from './events/events.module';
import { SemesterModule } from './semester/semester.module';
import { SettingsModule } from './settings/settings.module';
import { AuthModule } from './auth/auth.module';
import { MaterialsModule } from './materials/materials.module';
import { ExamsModule } from './exams/exams.module';

@Module({
  imports: [
    AuthModule,
    SemesterModule,
    CoursesModule,
    MaterialsModule,
    TimetableModule,
    ExamsModule,
    EventsModule,
    SettingsModule,
  ],
  exports: [],
})
export class FeaturesModule {}
