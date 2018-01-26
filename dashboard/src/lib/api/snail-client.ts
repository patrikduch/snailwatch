import {Observable} from 'rxjs/Observable';
import {Project} from '../project/project';
import {User} from '../user/user';
import {Benchmark} from '../benchmark/benchmark';

export interface SnailClient
{
    loginUser(username: string, password: string): Observable<string>;

    createProject(user: User, name: string): Observable<boolean>;
    loadProjects(user: User): Observable<Project[]>;

    loadBenchmarks(user: User, project: Project): Observable<Benchmark[]>;
}
