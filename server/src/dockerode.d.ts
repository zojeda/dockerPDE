
declare module "dockerode" {
//https://docs.docker.com/engine/reference/api/docker_remote_api_v1.22/#create-a-container
interface CreateContainerReq {
       name?: string;
       Hostname?: string;
       Domainname?: string;
       User?: string;
       AttachStdin?: boolean;
       AttachStdout?: boolean;
       AttachStderr?: boolean;
       Tty?: boolean;
       OpenStdin?: boolean;
       StdinOnce?: boolean;
       Env?: string[];
       Cmd?: string[]|string;
       Entrypoint?: string;
       Image: string;
       Labels?: {[label: string]: string};
       Mounts?: {
           Name?: string;
           Source?: string;
           Destination?: string;
           Driver?: string;
           Mode?: string;
           RW?: boolean;
           Propagation?: string;

			 }[];
       WorkingDir?: string;
       NetworkDisabled?: boolean;
       MacAddress?: string;
       ExposedPorts?: {
               [port: string]: {}
       };
       StopSignal?: string;
       HostConfig?: {
         Binds?: string[],
         Links?: string[],
         Memory?: number;
         MemorySwap?: number;
         MemoryReservation?: number;
         KernelMemory?: number;
         CpuShares?: number;
         CpuPeriod?: number;
         CpuQuota?: number;
         CpusetCpus?: string;
         CpusetMems?: string;
         BlkioWeight?: number;
         BlkioWeightDevice?: [{}];
         BlkioDeviceReadBps?: [{}];
         BlkioDeviceReadIOps?: [{}];
         BlkioDeviceWriteBps?: [{}];
         BlkioDeviceWriteIOps?: [{}];
         MemorySwappiness?: number;
         OomKillDisable?: boolean;
         OomScoreAdj?: number;
         PortBindings?: { [port: string]: [{ HostPort?: string }] },
         PublishAllPorts?: boolean;
         Privileged?: boolean;
         ReadonlyRootfs?: boolean;
         Dns?: string[];
         DnsOptions?: string[];
         DnsSearch?: string[];
         ExtraHosts?: string[];
         VolumesFrom?: string[];
         CapAdd?: string[];
         CapDrop?: string[];
         GroupAdd?: string[];
         RestartPolicy?: { Name?: string; MaximumRetryCount?: number };
         NetworkMode?: string;
         Devices?: [{PathOnHost?: string, PathInContainer?: string, CgroupPermissions?: string}];
         Ulimits?: [{}];
         LogConfig?: {
					 Type?: string, //json-file, syslog, journald, gelf, awslogs, splunk, none. json-file 
					 Config?: {} };
         SecurityOpt?: string[];
         CgroupParent?: string;
         VolumeDriver?: string;
         ShmSize?: number;
      };
  }

  interface ContainerInfo {
      Id: string;
      Names: string[];
      Image: string;
      ImageID: string;
      Command: string;
      Created: number;
      Status: string;
      Ports: {
        IP: string,
        PrivatePort: number,
        PublicPort: number;
        Type: string
      }[];
      Labels: {};
      SizeRw:number;
      SizeRootFs:number;
      NetworkSettings: {
              Networks: {
                      bridge: {
                              NetworkID: string;
                              EndpointID: string;
                              Gateway: string;
                              IPAddress: string;
                              IPPrefixLen: number;
                              IPv6Gateway: string;
                              GlobalIPv6Address: string;
                              GlobalIPv6PrefixLen: number;
                              MacAddress: string;
                      }
              }
      };

  }
  interface Container {
    inspect(options:{
      size: boolean
    }, done?: (err: Error, info: any) => any); //TODO info
    inspect(done?: (err: Error, info: any) => any); //TODO
    //rename
    //update
    //changes
    //export
    start({detachKeys: string}, done?: (err?: Error) => any);
    start(done?: (err?: Error) => any);
    //pause
    //unpause
    //exec
    //commit
    //stop
    //restart
    //kill
    //resize
    //attach
    //wait
    //remove
    //copy
    //getArchive
    //infoArchive
    //putArchivo
    logs(options: {
       follow?: boolean; // 1/True/true or 0/False/false, return stream. Default false.
       stdout?: boolean, // – 1/True/true or 0/False/false, show stdout log. Default false.
       stderr?: boolean, //– 1/True/true or 0/False/false, show stderr log. Default false.
       since?: number, // – UNIX timestamp (integer) to filter logs. Specifying a timestamp will only output log-entries since that timestamp. Default: 0 (unfiltered)
       timestamps?: boolean, // – 1/True/true or 0/False/false, print timestamps for every log line. Default false.
       tail?: number;
    }, callback: (error, stream:  NodeJS.ReadableStream)=>any);
    //stats
  }

  export = class Docker {
    constructor(dockerHost?: string);
    listContainers(options: {
      all?: boolean,
      limit?: number,
      since?: string,
      before?: string,
      size?: boolean
     }, done?: (err: Error, containers: ContainerInfo[]) => any );
    listContainers(done?: (err: Error, containers: ContainerInfo[]) => any );
    getContainer(id: string) : Container;
    createContainer(configuration: CreateContainerReq, callback: (err: Error, container: Container) => any );
  }
}

