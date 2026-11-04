import { Component } from '@angular/core';

type View = 'overview' | 'roadmap' | 'modules' | 'hana';

interface LearningStage {
  number: string;
  title: string;
  summary: string;
  topics: string[];
  duration: string;
}

interface SapModule {
  acronym: string;
  name: string;
  description: string;
  topics: string[];
  color: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  activeView: View = 'overview';
  searchTerm = '';
  completedStages = new Set<string>();

  private readonly pageTitles: Record<View, string> = {
    overview: 'Overview',
    roadmap: 'Learning path',
    modules: 'SAP modules',
    hana: 'HANA administration'
  };

  readonly stages: LearningStage[] = [
    {
      number: '01',
      title: 'SAP foundations',
      summary: 'Learn how SAP is organized and follow one business process from start to finish.',
      topics: ['SAP navigation', 'MM procurement', 'Master data'],
      duration: '1 week'
    },
    {
      number: '02',
      title: 'ABAP essentials',
      summary: 'Build a solid foundation in the language and learn to inspect data in a SAP system.',
      topics: ['ABAP basics', 'Open SQL', 'Debugging'],
      duration: '2 weeks'
    },
    {
      number: '03',
      title: 'ABAP development',
      summary: 'Create maintainable programs and understand how to extend standard behavior.',
      topics: ['ABAP Objects', 'Enhancements', 'BAPIs'],
      duration: '2 weeks'
    },
    {
      number: '04',
      title: 'HANA development',
      summary: 'Work with modern data models and write queries with performance in mind.',
      topics: ['CDS views', 'Modern Open SQL', 'Performance'],
      duration: '2 weeks'
    },
    {
      number: '05',
      title: 'Fiori and OData',
      summary: 'Connect SAP data to role-based applications and modern user experiences.',
      topics: ['OData', 'SAP Gateway', 'Fiori / UI5'],
      duration: '2 weeks'
    },
    {
      number: '06',
      title: 'Integration',
      summary: 'Trace how SAP exchanges data with other systems and services.',
      topics: ['IDocs', 'RFC / BAPI', 'REST APIs'],
      duration: '1 week'
    },
    {
      number: '07',
      title: 'Quality and support',
      summary: 'Practice testing, troubleshooting, and safely moving changes between systems.',
      topics: ['Test cases', 'Transports', 'Production support'],
      duration: '1 week'
    }
  ];

  readonly modules: SapModule[] = [
    {
      acronym: 'FI',
      name: 'Financial Accounting',
      description: 'Manage financial transactions and reporting across the organization.',
      topics: ['General ledger', 'Accounts payable', 'Asset accounting'],
      color: 'violet'
    },
    {
      acronym: 'CO',
      name: 'Controlling',
      description: 'Plan, track, and analyze costs and financial performance.',
      topics: ['Cost centers', 'Profitability', 'Budgeting'],
      color: 'blue'
    },
    {
      acronym: 'MM',
      name: 'Materials Management',
      description: 'Connect procurement, inventory, and invoice verification.',
      topics: ['Procurement', 'Inventory', 'Vendor management'],
      color: 'orange'
    },
    {
      acronym: 'SD',
      name: 'Sales and Distribution',
      description: 'Follow customer orders through delivery, billing, and returns.',
      topics: ['Sales orders', 'Shipping', 'Billing'],
      color: 'green'
    },
    {
      acronym: 'PP',
      name: 'Production Planning',
      description: 'Plan production with the materials, resources, and schedules required.',
      topics: ['Planned orders', 'Work centers', 'Bills of material'],
      color: 'pink'
    },
    {
      acronym: 'EWM',
      name: 'Warehouse Management',
      description: 'Coordinate warehouse movements, inventory, and storage operations.',
      topics: ['Storage bins', 'Goods movements', 'Warehouse operations'],
      color: 'teal'
    },
    {
      acronym: 'HCM',
      name: 'Human Capital Management',
      description: 'Support employee administration, time management, and development.',
      topics: ['Recruitment', 'Payroll', 'Time management'],
      color: 'indigo'
    }
  ];

  get progressPercent(): number {
    return Math.round((this.completedStages.size / this.stages.length) * 100);
  }

  get pageTitle(): string {
    return this.pageTitles[this.activeView];
  }

  get filteredModules(): SapModule[] {
    const query = this.searchTerm.trim().toLowerCase();
    if (!query) {
      return this.modules;
    }

    return this.modules.filter((module) =>
      [module.acronym, module.name, module.description, ...module.topics]
        .some((value) => value.toLowerCase().includes(query))
    );
  }

  setView(view: View): void {
    this.activeView = view;
  }

  toggleStage(number: string): void {
    const updated = new Set(this.completedStages);
    if (updated.has(number)) {
      updated.delete(number);
    } else {
      updated.add(number);
    }
    this.completedStages = updated;
  }

  updateSearch(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value;
    if (this.searchTerm.trim()) {
      this.activeView = 'modules';
    }
  }
}
