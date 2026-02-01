import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getPlatformOverview() {
    return {
      platform: 'OceanRota',
      type: 'Maritime Digital Platform',
      description:
        'OceanRota is a comprehensive maritime digital platform designed to support the global shipping and seafaring ecosystem.',
      modules: [
        'Vessel Marketplace',
        'Maritime Equipment & Supplies',
        'Maritime Services',
        'Seafarer Employment',
        'Crew & Seafarer Management',
        'Maritime Training & Certification',
        'Vessel Tokenization',
      ],
      standards: ['IMO-aligned terminology', 'Maritime industry best practices'],
      apiVersion: 'v1',
      status: 'Operational',
    };
  }
}
