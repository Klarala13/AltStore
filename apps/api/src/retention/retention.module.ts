import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bull";
import { RetentionProcessor } from "./retention.processor";
import { RetentionService } from "./retention.service";
import { RETENTION_QUEUE } from "./retention.constants";

@Module({
  imports: [BullModule.registerQueue({ name: RETENTION_QUEUE })],
  providers: [RetentionProcessor, RetentionService],
})
export class RetentionModule {}
