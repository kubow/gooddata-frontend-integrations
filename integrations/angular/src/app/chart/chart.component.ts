import { Component, OnInit, OnChanges, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import invariant from 'invariant';
import { IInsightViewProps } from '@gooddata/sdk-ui-all';
import tigerFactory, {
  TigerTokenAuthProvider,
} from '@gooddata/sdk-backend-tiger';
import { InsightView } from '@gooddata/sdk-ui-ext';
import { environment } from '../../environments/environment';

const backend = tigerFactory()
  .onHostname(environment.hostname)
  .withAuthentication(new TigerTokenAuthProvider(environment.apiKey));

@Component({
  selector: 'gooddata-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css',
})
export class ChartComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  public rootDomID: string;
  private reactRoot: ReactDOM.Root | null = null;

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID}' not found!`);
    return node;
  }

  protected getProps(): IInsightViewProps {
    return {
      workspace: environment.workspaceID,
      insight: environment.insightID,
      backend,
    };
  }

  private isMounted(): boolean {
    return !!this.rootDomID;
  }

  protected render() {
    if (this.isMounted()) {
      const container = this.getRootDomNode();
      
      // Create root if it doesn't exist
      if (!this.reactRoot) {
        this.reactRoot = ReactDOM.createRoot(container);
      }
      
      // Render the React component
      this.reactRoot.render(
        React.createElement(InsightView, this.getProps())
      );
    }
  }

  ngOnInit() {
    this.rootDomID = 'gooddata-chart';
  }

  ngOnChanges() {
    this.render();
  }

  ngAfterViewInit() {
    this.render();
  }

  ngOnDestroy() {
    if (this.reactRoot) {
      this.reactRoot.unmount();
      this.reactRoot = null;
    }
  }
}
